# Some processing

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
