import json
from os import listdir, path, walk
from os.path import isfile, join, expanduser
import struct
import io


def extract_map_grid(fileName):
    if isinstance(fileName, str):
        f = open(fileName, "rb")
    elif isinstance(fileName, (bytearray, bytes)):
        f = io.BytesIO(fileName)


    mapTbl = []
    f.read(4)
    tile_count, = struct.unpack("<I", f.read(4))
    for _ in range(tile_count):
        x,y,h,tl = struct.unpack("<IIIH", f.read(14))
        mapTile = {}
        mapTile['x'] = x
        mapTile['y'] = y
        mapTile['h'] = h
        mapTile['t'] = f.read(tl).decode("ascii")
        mapTbl.append(mapTile)

    return mapTbl


data = {}
fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/lapis/grid')) for f in fn]
for fileName in fileNames:
    data[fileName[:-12].split('/')[len(fileName[:-12].split('/')) - 1]] = extract_map_grid(fileName)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/collabo/grid')) for f in fn]
for fileName in fileNames:
    data[fileName[:-12].split('/')[len(fileName[:-12].split('/')) - 1]] = extract_map_grid(fileName)

with open('data/map/gl/grids.json', 'w') as outfile:
    json.dump(data, outfile)


data = {}
fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/lapis/grid')) for f in fn]
for fileName in fileNames:
    data[fileName[:-12].split('/')[len(fileName[:-12].split('/')) - 1]] = extract_map_grid(fileName)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/collabo/grid')) for f in fn]
for fileName in fileNames:
    data[fileName[:-12].split('/')[len(fileName[:-12].split('/')) - 1]] = extract_map_grid(fileName)

with open('data/map/jp/grids.json', 'w') as outfile:
    json.dump(data, outfile)