//RESOURCES.JS

var baseVolume = 0.2;

var g_resources= [
// our level tileset
{
	name: "ggj_level_tiles",
	type: "image",
	src: "data/area01_tileset/ggj_level_tiles.png"
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
	src: "data/sprite/gpig_sprite.png"
},
{
	name: "virusEntity",   //this matches the "image" property value for an object in tiled
	type: "image",
	src: "data/sprite/virus.png"
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
	name: "16x16_font",
	type: "image",
	src: "data/sprite/16x16_font.png"
},
{
	name: "title_screen",
	type:"image",
	src: "data/tiles/front_screen.png"
},
{
	name: "win_screen",
	type:"image",
	src: "data/tiles/win_screen.png"
},
{
	name: "lose_screen",
	type:"image",
	src: "data/tiles/lose_screen.png"
},
{
	name: "ba",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
	volume: baseVolume * 5
},
{
	name: "bum",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
	volume: baseVolume * 5
},
{
	name: "bangthataccordion",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_bounce_1",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
	volume: baseVolume
},
{
	name: "sfx_gerbil_bounce_2",
	type: "audio",
	src:  "data/audio/",
	channel: 2,
	volume: baseVolume
},
{
	name: "sfx_gerbil_chomp_1",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_chomp_2",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_laser_1",
	type: "audio",
	src:  "data/audio/",
	channel: 5,
	volume: baseVolume
},
	/*
{
	name: "sfx_gerbil_laser_2",
	type: "audio",
	src:  "data/audio/",
	channel: 5,
},
*/
{
	name: "sfx_gerbil_squeal_1",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_squeal_2",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_yay_1",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_gerbil_yay_2",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_whblcell_hurt",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_whblcell_hurt_2",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_whblcell_success_1",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "sfx_whblcell_success_2",
	type: "audio",
	src:  "data/audio/",
	channel: 1,
	volume: baseVolume
},
{
	name: "crash",
	type: "audio",
	src:  "data/audio/",
	channel: 5,
	volume: baseVolume
},
];

