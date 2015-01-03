const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

const SCHEMA_PATH = 'org.gnome.shell.extensions.vbrosseau.xkbswitcher';

function get_local_gsettings(schema_path) {
	const GioSSS = Gio.SettingsSchemaSource;

	let schemaDir = Extension.dir.get_child('schemas');
	let schemaSource = GioSSS.new_from_directory(
		schemaDir.get_path(),
		GioSSS.get_default(),
		false);

	let schemaObj = schemaSource.lookup(schema_path, true);
	if (!schemaObj) {
		throw new Error(
			'Schema ' + schema_path +
			' could not be found for extension ' +
			Extension.metadata.uuid
		);
	}
	return new Gio.Settings({ settings_schema: schemaObj });
};

function Prefs() {
	var self = this;
	var settings = this.settings = get_local_gsettings(SCHEMA_PATH);

	this.RESTORE = {
		key: 'restore',
		get: function() { return settings.get_boolean(this.key); },
		set: function(v) { settings.set_boolean(this.key, v); }
	};

	this.PATH = {
		key: 'path',
		get: function() { return settings.get_string(this.key); },
		set: function(v) { settings.set_string(this.key, v); }
	};

	this.OTHER_LAYOUT = {
		key: 'otherlayout',
		get: function() { return settings.get_string(this.key); },
		set: function(v) { settings.set_string(this.key, v); }
	};

	this.LAST_LAYOUT = {
		key: 'lastlayout',
		get: function() { return settings.get_string(this.key); },
		set: function(v) { settings.set_string(this.key, v); }
	};
};
