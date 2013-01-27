//RESOURCES.JS
var g_resources= [
// our level tileset
{
	name: "area01_level_tiles",
	type: "image",
	src: "data/area01_tileset/area01_level_tiles.png"
},
// our level
{
	name: "area01",
	type: "tmx",
	src: "data/area01.tmx"
},
// the main player spritesheet
{
	name: "guinea_pig",
	type: "image",
	src: "data/tiles/guinea_pig.png"
},
{
	name: "gripe_run_right",
	type: "image",
	src: "data/sprite/gripe_run_right.png"
},
{
	name: "virusEntity",   //this matches the "image" property value for an object in tiled
	type: "image",
	src: "data/sprite/spinning_coin_green.png"
},
{
	name: "whiteBloodCellEntity",   //this matches the "image" property value for an object in tiled
	type: "image",
	src: "data/sprite/white_blood_cell.png"
},
{
	name:"laserEntity",
	type: "image",
	src:"data/sprite/tmplaser.png"
},
// the parallax background
{
	name: "background",
	type: "image",
	src: "data/tiles/background.png"
},
{
	name: "particles1",
	type: "image",
	src: "data/tiles/particles1.png"
},
{
	name: "area01_bkg0",
	type: "image",
	src: "data/area01_parallax/area01_bkg0.png"
},
{
	name: "area01_bkg1",
	type: "image",
	src: "data/area01_parallax/area01_bkg1.png"
},
{
	name:"metatiles32x32",
	type: "image",
	src: "data/area01_tileset/metatiles32x32.png"
},
// game font
{
	name: "32x32_font",
	type: "image",
	src: "data/sprite/32x32_font.png"
},
{
	name: "title_screen",
	type:"image",
	src: "data/GUI/title_screen.png"
},
{
	name: "ba",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
},
{
	name: "bum",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
},
];

