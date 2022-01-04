# blibli-qa-errorbook
_Project_ ini merupakan aplikasi _front-end_ dari Error Book Blibli. _Project_ ini dikembangkan menggunakan _framework_ Vue.js
Cohtoh _interface_ dari Error Book dapat dilihat pada tautan [berikut](http://errorbook.herokuapp.com/#/)

### ***Development Environment Requirement***
```
[Node.js] 14.15.1 (minimum) 
[Git]
IDE
```

### ***Project setup***
```
npm install
```

#### _Compiles and hot-reloads for development_
```
npm run serve
```

#### _Compiles and minifies for production_
```
npm run build
```

#### _Lints and fixes files_
```
npm run lint
```

### ***Replication Guide***
Untuk mereplikasi _frontend_ Error Book, ada beberapa konfigurasi yang harus dilakukan

```
Mereplikasi _plugin_ dan menyediakan Elastic Stack terlebih dahulu. Pada Kibana, buat ulang seluruh _chart_ dan _graph_ yang tertera pada Error Book dengan Kibana Lens 
```
Tekan untuk melihat informasi lebih lanjut mengenai [Kibana Lens](https://www.elastic.co/kibana/kibana-lens)

```
Pada _project_ ini, ubah nilai konstanta ELASTIC_URL pada seluruh _file_ dibawah folder service. Selain itu, perbaharuilah url seluruh _chart_ dan _graph_ pada folder components/kibana. Ganti juga url untuk mendapatkan _list_ divisi pada file service/service.js
```
```
Perhatikan kembali komentar-komentar dari tim pengembang pada setiap file
```


### ***License***

_This project copyright is under Creative Commons Attribution-ShareAlike 4.0 International Public License_

_For more information please refer to_ [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0)

[Node.js]: https://nodejs.org
[Git]: https://git-scm.com

