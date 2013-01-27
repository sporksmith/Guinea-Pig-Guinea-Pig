#!/bin/sh

mkdir -p dist/src
cp -r *.js lib data dist/src

mkdir -p dist/release
cp -r *.js lib data dist/release
#FIXME cp README.txt dist/release

mkdir -p dist/press
cp other/team-photo.jpg dist/press

mkdir -p dist/other

#FIXME cp license.txt

