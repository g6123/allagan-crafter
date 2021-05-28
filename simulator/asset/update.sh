#!/bin/bash
echo "$(basename $0)"

BASE_URL="https://github.com/ffxiv-teamcraft/ffxiv-teamcraft/raw/master/apps/client/src/assets/data"
ITEM_URL="$BASE_URL/ko/ko-items.json"
RECIPE_URL="$BASE_URL/ko/ko-recipes.json"

curl -L $ITEM_URL \
  | jq -c 'to_entries[] | {id: .key, name: .value.ko}' \
  > items.ndjson

curl -L $RECIPE_URL \
  | jq -c 'del(.[].ingredients) | .[]' \
  > recipes.ndjson

curl -L $RECIPE_URL \
  | jq -c '
      map({ id, ingredient: .ingredients[] })
      | map(.ingredient + {recipeId: .id, itemId: .ingredient.id})
      | del(.[].id)
      | .[]' \
  > ingredients.ndjson

pipx run sqlitebiter -v \
  -o db.sqlite \
  file *.ndjson
