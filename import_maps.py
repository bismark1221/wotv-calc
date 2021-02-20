import json
from os import listdir
from os.path import isfile, join

data = {}

# with open('../wotv-ffbe-dump/map/arena00001_set.json') as json_file:
#     data = json.load(json_file)
#     # for p in data['info']:
#     #     print('Name: ' + p['angle_override'])
#     #     print('')
#     print(data['info'])


fileNames = [f for f in listdir('../wotv-ffbe-dump/map') if isfile(join('../wotv-ffbe-dump/map', f))]

print(fileNames)

data = {}
for fileName in fileNames:
    with open('../wotv-ffbe-dump/map/' + fileName) as json_file:
        rawData = json.load(json_file)

        data[fileName[:-5]] = {}
        if 'drop_table_list' in rawData:
            data[fileName[:-5]]['drop_table_list'] = rawData['drop_table_list']

        if 'enemy' in rawData:
            enemy = []
            for rawEnemy in rawData['enemy']:
                reducedEnemy = {}
                reducedEnemy['iname'] = rawEnemy['iname']
                if 'skills' in rawEnemy:
                    reducedEnemy['skills'] = rawEnemy['skills']
                enemy.append(reducedEnemy)
            data[fileName[:-5]]['enemy'] = enemy

with open('data/map/gl/maps.json', 'w') as outfile:
    json.dump(data, outfile)
