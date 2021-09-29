# Some processing
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
