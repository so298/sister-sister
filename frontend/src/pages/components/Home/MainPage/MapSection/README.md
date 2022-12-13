# React + D3 による開発について

## DOM 操作の方法

- React が d3 から要素を受け取り，React がレンダリングする
- データ可視化部分だけ d3 がレンダリングする

## TS の型について

```javascript
d3.json<Topology>('.data/japan.json').then();
d3.Selection<SVGSVGElement, Feature[], null, undefined>
```

複雑．

## d3 を使用している Map 系のライブラリ

[React Simple Maps](https://www.react-simple-maps.io/)
