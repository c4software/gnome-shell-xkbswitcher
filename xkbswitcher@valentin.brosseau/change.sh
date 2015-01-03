#!/bin/bash

setxkbmap -I $1/.xkb $2 -print | xkbcomp -I$1/.xkb - $DISPLAY