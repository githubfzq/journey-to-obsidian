# Journey to Obsidian converter

The app converts `.json` files exported from [Journey](https://journey.cloud/) to markown files, that can be read by [Obsidian](https://obsidian.md/)

Tested on node 14.x

## Install
```sh
🐧 npm install
```

## Run
```sh
🐧 mkdir -p output
🐧 npm start # use default directories
🐧 npm start -- --help
🐧 npm start -- -i myjsons -o mymarkdowns
```

The input is path to the directory that contains `.json` files;
The output is path to the directory that will contains `.md` files; The directory must exists before run the app.

## The ~~dark~~ dev side
## Generate fake data
```sh
🐧 mkdir -p data
🐧 N=9
🐧 for i in {0..$N}; do npm run --silent fake > "data/fake_$i.json"; done
```

## Clean fake data
```sh
🐧 rm data/*
```
