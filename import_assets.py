#!/usr/bin/env python3

import json
from os import listdir, path, walk
from os.path import isfile, join, expanduser
from shutil import copyfile
import struct
import io
from PIL import Image



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


print('### Import GL Grids')
data = {}
# fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/lapis/grid')) for f in fn]
# for fileName in fileNames:
#   smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
#     data[smallFileName[:-12]] = extract_map_grid(fileName)
#     print(smallFileName[:-12])
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
#     data[smallFileName[:-13]] = extract_map_grid(fileName)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/collabo/grid')) for f in fn]
for fileName in fileNames:
  smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
  if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
    data[smallFileName[:-12]] = extract_map_grid(fileName)
    print(smallFileName[:-12])
  if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
    data[smallFileName[:-13]] = extract_map_grid(fileName)
    print(smallFileName[:-13])

# with open('data/map/gl/grids.json', 'w') as outfile:
#   json.dump(data, outfile)


# print('### Import JP Grids')
# data = {}
# fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/lapis/grid')) for f in fn]
# for fileName in fileNames:
#   smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
#     data[smallFileName[:-12]] = extract_map_grid(fileName)
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
#     data[smallFileName[:-13]] = extract_map_grid(fileName)

# fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/collabo/grid')) for f in fn]
# for fileName in fileNames:
#   smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
#     data[smallFileName[:-12]] = extract_map_grid(fileName)
#   if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
#     data[smallFileName[:-13]] = extract_map_grid(fileName)

# with open('data/map/jp/grids.json', 'w') as outfile:
#   json.dump(data, outfile)


# print('### Import Locales')
# localeFolders = [
#   {
#     'srcFolder': '../wotv-assets/global/localize/fr/text/masterparam',
#     'destFolder': 'data/fr'
#   },
#   {
#     'srcFolder': '../wotv-assets/global/localize/en/text/masterparam',
#     'destFolder': 'data/en'
#   },
#   {
#     'srcFolder': '../wotv-assets/global/localize/de/text/masterparam',
#     'destFolder': 'data/de'
#   },
#   {
#     'srcFolder': '../wotv-assets/global/localize/es/text/masterparam',
#     'destFolder': 'data/es'
#   },
#   {
#     'srcFolder': '../wotv-assets/global/localize/ko/text/masterparam',
#     'destFolder': 'data/ko'
#   },
#   {
#     'srcFolder': '../wotv-assets/global/localize/zh/text/masterparam',
#     'destFolder': 'data/zh'
#   },
#   {
#     'srcFolder': '../wotv-assets/japan/localize/ja/text/masterparam',
#     'destFolder': 'data/jp'
#   }
# ]
# localeFiles = [
#   'artifactgrow',
#   'artifactname',
#   'buffname',
#   'guildawardsname',
#   'guildawardsdescription',
#   'itemname',
#   'itemother',
#   'jobname',
#   'playerawardsname',
#   'playerawardsdescription',
#   'quest/questtitle',
#   'skillname',
#   'unitname',
#   'visioncardname',
#   'towertitle',
#   'towerfloortitle'
# ]
# for localeFolder in localeFolders:
#   for localeFile in localeFiles:
#     if len(localeFile.split('/')) > 1:
#       copyfile(
#         path.join(localeFolder['srcFolder'], localeFile + '.txt'),
#         path.join(localeFolder['destFolder'], localeFile.split('/')[1] + '.json')
#       )
#     else:
#       copyfile(
#         path.join(localeFolder['srcFolder'], localeFile + '.txt'),
#         path.join(localeFolder['destFolder'], localeFile + '.json')
#       )


# print('### Import GL maps')
# data = {}
# fileNames = [f for f in listdir('../wotv-dump/map') if isfile(join('../wotv-dump/map', f))]

# data = {}
# for fileName in fileNames:
#     with open('../wotv-dump/map/' + fileName) as json_file:
#         rawData = json.load(json_file)

#         data[fileName[:-5]] = {}
#         if 'drop_table_list' in rawData:
#             data[fileName[:-5]]['drop_table_list'] = {}
#             for dropTable in rawData['drop_table_list']:
#                 if dropTable['iname'] != 'CRYSTAL_00':
#                     data[fileName[:-5]]['drop_table_list'][dropTable['iname']] = dropTable

#         if 'enemy' in rawData:
#             enemy = []
#             for rawEnemy in rawData['enemy']:
#                 reducedEnemy = {}
#                 reducedEnemy['iname'] = rawEnemy['iname']
#                 reducedEnemy['x'] = rawEnemy['x']
#                 reducedEnemy['y'] = rawEnemy['y']
#                 reducedEnemy['lv'] = rawEnemy['lv']
#                 reducedEnemy['elem'] = rawEnemy['elem']

#                 if 'brave' in rawEnemy:
#                     reducedEnemy['brave'] = rawEnemy['brave']
#                 if 'faith' in rawEnemy:
#                     reducedEnemy['faith'] = rawEnemy['faith']
#                 if 'skills' in rawEnemy:
#                     reducedEnemy['skills'] = rawEnemy['skills']
#                 if 'drop' in rawEnemy:
#                     reducedEnemy['drop'] = rawEnemy['drop']
#                 if 'side' in rawEnemy:
#                     reducedEnemy['side'] = rawEnemy['side']
#                 if 'part' in rawEnemy:
#                     if 'body' in rawEnemy['part']:
#                       if rawEnemy['part']['body'] != '':
#                           reducedEnemy['hasBody'] = True
#                 if 'status' in rawEnemy:
#                     reducedEnemy['status'] = rawEnemy['status']
#                 if 'nrmSkl' in rawEnemy:
#                     if rawEnemy['nrmSkl']['iname'] != "":
#                         reducedEnemy['nrmSkl'] = rawEnemy['nrmSkl']['iname']

#                 enemy.append(reducedEnemy)
#             data[fileName[:-5]]['enemy'] = enemy

#         if 'party' in rawData:
#             party = []
#             for rawParty in rawData['party']:
#                 reducedParty = {}
#                 reducedParty['x'] = rawParty['x']
#                 reducedParty['y'] = rawParty['y']
#                 party.append(reducedParty)
#             data[fileName[:-5]]['party'] = party

#         if 'arena' in rawData:
#             arena = []
#             for rawArena in rawData['arena']:
#                 reducedArena = {}
#                 reducedArena['x'] = rawArena['x']
#                 reducedArena['y'] = rawArena['y']
#                 arena.append(reducedArena)
#             data[fileName[:-5]]['arena'] = arena

# with open('data/map/gl/maps.json', 'w') as outfile:
#     json.dump(data, outfile)


# print('### Import JP maps')
# data = {}
# fileNames = [f for f in listdir('../wotv-dump/jp_map') if isfile(join('../wotv-dump/jp_map', f))]

# data = {}
# for fileName in fileNames:
#     with open('../wotv-dump/jp_map/' + fileName) as json_file:
#         rawData = json.load(json_file)

#         data[fileName[:-5]] = {}
#         if 'drop_table_list' in rawData:
#             data[fileName[:-5]]['drop_table_list'] = {}
#             for dropTable in rawData['drop_table_list']:
#                 if dropTable['iname'] != 'CRYSTAL_00':
#                     data[fileName[:-5]]['drop_table_list'][dropTable['iname']] = dropTable

#         if 'enemy' in rawData:
#             enemy = []
#             for rawEnemy in rawData['enemy']:
#                 reducedEnemy = {}
#                 reducedEnemy['iname'] = rawEnemy['iname']
#                 reducedEnemy['x'] = rawEnemy['x']
#                 reducedEnemy['y'] = rawEnemy['y']
#                 reducedEnemy['lv'] = rawEnemy['lv']
#                 reducedEnemy['elem'] = rawEnemy['elem']

#                 if 'brave' in rawEnemy:
#                     reducedEnemy['brave'] = rawEnemy['brave']
#                 if 'faith' in rawEnemy:
#                     reducedEnemy['faith'] = rawEnemy['faith']
#                 if 'skills' in rawEnemy:
#                     reducedEnemy['skills'] = rawEnemy['skills']
#                 if 'drop' in rawEnemy:
#                     reducedEnemy['drop'] = rawEnemy['drop']
#                 if 'side' in rawEnemy:
#                     reducedEnemy['side'] = rawEnemy['side']
#                 if 'part' in rawEnemy:
#                     if 'body' in rawEnemy['part']:
#                       if rawEnemy['part']['body'] != '':
#                           reducedEnemy['hasBody'] = True
#                 if 'status' in rawEnemy:
#                     reducedEnemy['status'] = rawEnemy['status']
#                 if 'nrmSkl' in rawEnemy:
#                     if rawEnemy['nrmSkl']['iname'] != "":
#                         reducedEnemy['nrmSkl'] = rawEnemy['nrmSkl']['iname']

#                 enemy.append(reducedEnemy)
#             data[fileName[:-5]]['enemy'] = enemy

#         if 'party' in rawData:
#             party = []
#             for rawParty in rawData['party']:
#                 reducedParty = {}
#                 reducedParty['x'] = rawParty['x']
#                 reducedParty['y'] = rawParty['y']
#                 party.append(reducedParty)
#             data[fileName[:-5]]['party'] = party

#         if 'arena' in rawData:
#             arena = []
#             for rawArena in rawData['arena']:
#                 reducedArena = {}
#                 reducedArena['x'] = rawArena['x']
#                 reducedArena['y'] = rawArena['y']
#                 arena.append(reducedArena)
#             data[fileName[:-5]]['arena'] = arena

# with open('data/map/jp/maps.json', 'w') as outfile:
#     json.dump(data, outfile)