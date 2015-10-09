const Gtk = imports.gi.Gtk;

let Extension = imports.misc.extensionUtils.getCurrentExtension();
let Settings = Extension.imports.settings;

function init() {
}

function buildPrefsWidget() {
    let frame = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        border_width: 10
    });

    (function() {
        frame.add(restore_box());
        frame.add(path_box());
        frame.add(list_box());
    })();

    frame.show_all();
    return frame;
}

function restore_box(){
    let config = new Settings.Prefs();
    let restore_pref = config.RESTORE;

    restore_hbox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 20
    });
    restore_label = new Gtk.Label({
        label: "Auto restore last used layout",
        xalign: 0
    });
    restore_switch = new Gtk.Switch({active: restore_pref.get()});

    restore_switch.connect('notify::active', function(button) {
        restore_pref.set(button.active);
    });

    restore_hbox.pack_start(restore_label, true, true, 0);
    restore_hbox.add(restore_switch);
    return restore_hbox;
}

function path_box(){
    let config = new Settings.Prefs();
    let path_pref = config.PATH;

    path_hbox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 20,
        margin_top: 5
    });

    path_label = new Gtk.Label({
        label: "Layouts folder :",
        xalign: 0
    });

    path_text = new Gtk.Label({
        label: "~/.xkb/symbols/",
        xalign: 0
    });

    // let path_entry = new Gtk.Entry({text: path_pref.get(), hexpand: true, margin_bottom: 12 });

    // path_entry.connect('notify::text', function(entry) {
    //     path_pref.set(entry.text);
    // });

    path_hbox.pack_start(path_label, true, true, 0);
    path_hbox.add(path_text);
    return path_hbox;
}

function list_box(){
    let config = new Settings.Prefs();
    let list_pref = config.OTHER_LAYOUT;

    list_hbox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 20,
        margin_top: 5
    });

    list_label = new Gtk.Label({
        label: "Other layouts (comma separated)",
        xalign: 0
    });

    let list_entry = new Gtk.Entry({text: list_pref.get(), hexpand: true, margin_bottom: 12 });

    list_entry.connect('notify::text', function(entry) {
        list_pref.set(entry.text);
    });

    list_hbox.pack_start(list_label, true, true, 0);
    list_hbox.add(list_entry);
    return list_hbox;
}
