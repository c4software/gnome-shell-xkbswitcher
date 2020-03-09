# Gnome Shell Xkbswitcher

Gnome Shell Xkbswitcher is a simple Gnome-Shell extension to simplify the usage of customs layout located in the user directory (also at the system level, but it's not the purpose of this tool)

![Extension](screen.png)


## Installation

- [Download the extension](https://github.com/c4software/gnome-shell-xkbswitcher/archive/master.zip)
- Move the `xkbswitcher@valentin.brosseau` folder to `~/.local/share/gnome-shell/extensions/`
- Restart Gnome Shell (alt-f2 then type `r`)
- Enable the extension (https://extensions.gnome.org/local/)

## Configuration

- First you need a custom layout [example](https://github.com/c4software/bepo_developpeur/tree/master/linux) (but if you are here…)
- Custom layout are loaded from `~/.xkb/symbols/`
- Drop your custom layout inside it should be automaticaly available in the extension.

## Exemple 

```
$ mkdir -p ~/.xkb/symbols/
$ cd ~/.xkb/symbols/
$ wget https://raw.githubusercontent.com/c4software/bepo_developpeur/master/linux/bepoDev
```

![Extension](screen.png)

Done !
