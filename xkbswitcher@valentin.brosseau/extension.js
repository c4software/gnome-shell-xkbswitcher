/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Drive menu extension
const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const St = imports.gi.St;
const Shell = imports.gi.Shell;
const Util = imports.misc.util;
const Main = imports.ui.main;
const Panel = imports.ui.panel;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Mainloop = imports.mainloop;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Settings = Extension.imports.settings;

const user_dir = String(GLib.get_home_dir());
const config = new Settings.Prefs();

const lastlayout_pref = config.LAST_LAYOUT;
const restore_pref = config.RESTORE;
const path_pref = config.PATH;
const other_layout = config.OTHER_LAYOUT;

let _indicator, icon, current_layout;

const xmodmapSwitcher = new Lang.Class({
	Name: 'xmodmapSwitcher.xmodmapSwitcher',
	Extends: PanelMenu.Button,

	_init: function() {
		this.parent(0.0, _("keyboard"));

		let hbox = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
		icon = new St.Label({ text: '⌨', y_align: Clutter.ActorAlign.CENTER });

		hbox.add_child(icon);
		
		hbox.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));

		this.actor.add_child(hbox);
		
		build_menu(this.menu);

		this.menu.connect('open-state-changed', function(elem, isPoppedUp) {
			if(isPoppedUp){
				build_menu(elem);
			}
	    });
	}
});

function enable_layout(file_layout){
	try{
		lastlayout_pref.set(file_layout);
		//let command = '/usr/bin/xmodmap -verbose -display :0 '+user_dir+'/.xmodmaplayout/'+file_layout;
		//resu = GLib.spawn_command_line_sync(command)
		let command = Extension.path+"/change.sh '"+user_dir+"' '"+file_layout+"'"
		GLib.spawn_command_line_sync(command);
		Main.notify(file_layout+" loaded");
		icon.set_text(file_layout);
		current_layout = file_layout;
	}
	catch (err) {	
		Main.notifyError("Can't load your layout ("+err+").");		
	}
}

function build_menu(dropdown){
	// Empty the menu before doing anything
	dropdown.removeAll();


	// Recreate the entry.
	try {
		let command ='ls -1 '+user_dir+'/.xkb/symbols/'; 
		let layout_av = String(GLib.spawn_command_line_sync(command)[1]).split("\n");
		let ol = other_layout.get().split(",");
		layout_av = layout_av.concat(ol);

		for (i=0;i<layout_av.length;i++)
		{
			let user_layout = layout_av[i];
			if (user_layout != ""){
				item = dropdown.addAction(user_layout, function(event) {
					enable_layout(user_layout);
				});

				if(current_layout == user_layout){
					item.setOrnament(PopupMenu.Ornament.DOT);
				}
			}
		}
	}
	catch (err) {	
		Main.notifyError("Can't list your layout. ("+err+")");		
	}

	// Recreate the configuration link
	dropdown.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
	dropdown.addAction(_("Configuration"), function(event) {
		Util.spawn([ 'gnome-shell-extension-prefs', 'xkbswitcher@valentin.brosseau' ]);
	});
}

function start_extension(){
	if(!_indicator){
		_indicator = new xmodmapSwitcher;
	}
	
	Main.panel.addToStatusArea('Xmodmap Switcher', _indicator);
	
	if(restore_pref.get() && lastlayout_pref.get() != ""){
		// Add delay to enable
		Mainloop.timeout_add_seconds(1, function(){
			enable_layout(lastlayout_pref.get())
		});
	}
}

function enable() {
	start_extension();
}

function disable() {
	_indicator.destroy();
	_indicator = null;
}

function init() {}
