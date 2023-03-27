# API SOLO PROJECT

## 概要

世界各国の国名、面積、人口、人口密度のデータを扱うための API

> データソース： https://ict.teikokushoin.co.jp/statistics/world.xhtml

## 使用方法

### 全データ取得

`GET /country`

### 一部データ取得

表示数制限  
`GET /country?limit=`  
ID or 国名指定 (※国名は大文字/小文字を区別せず部分一致検索)  
`GET /country/{id or name}`

### データ追加

`POST /country`  
request body : JSON Format  
`{id: {id}, name: {name}, area: {area}, population: {population}, population_density: {population_density} }`

### データ更新

`PATCH /country/{id or name}`  
request body : JSON Format (※全ての key を含める必要はない)  
 `{id: {id}, name: {name}, area: {area}, population: {population}, population_density: {population_density} }`

### データ削除

`DELETE /country/{id or name}`
