!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=7)}([function(t,e){var i={isFunction:function(t){return"function"==typeof t},linSearch:function(t,e,i){for(var n=0;n<t.length;n++)if(i(t[n],e))return n;return-1},isNullOrUndefined:function(t){return null==t},degreesToRadians:function(t){return t/180*Math.PI},checkCollision:function(t,e,i,n,r,o,s,a){return t<r+s&&t+i>r&&e<o+a&&e+n>o},mergeProperties:function(t,e){var i=Object.keys(t);i&&i.forEach((function(i){e[i]=t[i]}))}};t.exports=i},function(t,e){t.exports=function(t,e,i){this.type=t,this.data=e,this.time=i||Date.now()}},function(t,e,i){var n=i(0),r=i(1);function o(t){t=t||{},this._eventNotifierMixinId=o.id++,this._eventNotifierMixinHandlerId=0,this._EventNotifierMixin_debug=t.EventNotifierMixin_debug||!1,this.EventNotifierMixinInitializer=function(){this._eventListeners={}},this.addEventHandler=function(t,e,i){var n=i||"eventHandler_"+this._eventNotifierMixinId+"."+this._eventNotifierMixinHandlerId;return this._eventNotifierMixinHandlerId++,this._eventListeners[t]||this.registerEventType(t),this._eventListeners[t][n]=e,n},this.registerEventType=function(t){this._eventListeners[t]=this._eventListeners[t]||{}},this.on=this.addEventHandler,this.removeEventHandler=function(t){Object.keys(this._eventListeners).forEach(function(e){this._eventListeners[e][t]&&delete this._eventListeners[e][t]}.bind(this))},this.clearEventHandlers=function(t){!this._eventListeners[t]&&this._EventNotifierMixin_debug&&console.log("Unknown event type:"+t),this._eventListeners[t]={}},this.notify=function(t,e,i){var o=null;if(o=t instanceof r?t:new r(t,e,i),this._eventListeners[o.type])for(var s=Object.keys(this._eventListeners[o.type]),a=0;a<s.length;a++)n.isFunction(this._eventListeners[o.type][s[a]])&&this._eventListeners[o.type][s[a]](o);else this._EventNotifierMixin_debug&&console.log("Unknown event type:"+o.type)}}o.id=0,t.exports=o},function(t,e){function i(){this._heapSize=0,this._a=[],this.invertPriority=!1}i.IComparable=function(){},i.IComparable.prototype.compareTo=function(t){throw new Error("not implemented")},i.IComparable.prototype.equals=function(t){throw new Error("not implemented")},i.prototype.setInvertPriority=function(t){this.invertPriority=t,this.sort()},i.prototype.sort=function(){this._buildMaxHeap();for(var t=this._heapSize-1;t>=1;t--)this._swap(0,t),this._maxHeapify(0,this._heapSize-(this._heapSize-t))},i.prototype._maxHeapify=function(t,e,i){var n=0,r=2*t+1,o=2*t+2;void 0===i&&(i=this.invertPriority?-1:1),n=r<e&&this._a[r].compareTo(this._a[t])===i?r:t,o<e&&this._a[o].compareTo(this._a[n])===i&&(n=o),n!=t&&(this._swap(t,n),this._maxHeapify(n,e,i))},i.prototype._swap=function(t,e){var i=this._a[t];this._a[t]=this._a[e],this._a[e]=i},i.prototype._buildMaxHeap=function(){for(var t=Math.floor((this._heapSize-1)/2);t>=0;t--)this._maxHeapify(t,this._heapSize)},i.prototype.extractMax=function(){if(this._heapSize<1)return null;var t=this._a[0];return this._a[0]=this._a[this._heapSize-1],this._heapSize--,this._maxHeapify(0,this._heapSize,this.invertPriority?1:-1),t},i.prototype.insert=function(t){var e=this._heapSize;this._heapSize===this._a.length?this._a.push(t):this._a[e]=t,this._heapSize++,this.increaseKey(e)},i.prototype.increaseKey=function(t){for(;t>0&&this._a[this._parent(t)].compareTo(this._a[t])===(this.invertPriority?-1:1);)this._swap(t,this._parent(t)),t=this._parent(t)},i.prototype.decreaseKey=function(t){this._maxHeapify(t,this._heapSize,this.invertPriority?1:-1)},i.prototype.getByIndex=function(t){if(t>this._heapSize||t<0)throw new Error("Index out of bounds: "+t+". (queue size:"+this._heapSize+")");return this._a[t]},i.prototype.getByEquality=function(t){var e=this.indexOf(t);return-1===e?null:this._a[e]},i.prototype.size=function(){return this._heapSize},i.prototype.contains=function(t){for(var e=0;e<this._heapSize;e++)if(t.equals(this._a[e]))return!0;return!1},i.prototype.indexOf=function(t){for(var e=0;e<this._heapSize;e++)if(t.equals(this._a[e]))return e;return-1},i.prototype.remove=function(t){if(!(this._heapSize<1)){var e=this.indexOf(t);e<0||(this._a[e]=this._a[this._heapSize-1],this._heapSize--,this._maxHeapify(e,this._heapSize,this.invertPriority?1:-1))}},i.prototype.clear=function(){this._heapSize=0},i.prototype._verifyHeap=function(t){if(null==t&&(t=0),t>=this._heapSize)return!0;var e=this.invertPriority?1:-1,i=2*t+1,n=2*t+2,r=!0;return i<this._heapSize&&this._a[i].compareTo(this._a[t])===e&&(r=!1),r&&n<this._heapSize&&this._a[n].compareTo(this._a[t])===e&&(r=!1),r&&i<this._heapSize&&(r=this._verifyHeap(i))&&n<this._heapSize&&(r=this._verifyHeap(n)),r},i.prototype._parent=function(t){return Math.floor((t-1)/2)},i.prototype.pop=i.prototype.extractMax,i.prototype.poll=i.prototype.extractMax,i.prototype.push=i.prototype.insert,i.prototype.peek=function(){return this._heapSize<1?null:this._a[0]},t.exports=i},function(t,e,i){function n(){this.EventNotifierMixinInitializer({eventListeners:[]})}i(2).call(n.prototype),t.exports=n},function(t,e,i){var n=i(0),r=function(){this.head=null,this.tail=null,this._size=0};r.prototype.push=function(t){var e=new o(t,null);0===this._size?this.head=e:this.tail.next=e,this.tail=e,this._size++},r.prototype.pop=function(){var t=this.head;return null!==this.head&&(this.head=this.head.next,this._size--),null===t?null:t.elem},r.prototype.clear=function(){this.head=null,this.tail=null,this._size=0},r.prototype.newIterator=function(){return new r.QueueIterator(this.head)},r.prototype.contains=function(t){for(var e=this.newIterator(),i=null;null!==(i=e.getCurrent());){if(i===t||n.isFunction(i.equals)&&i.equals(t))return!0;e.next()}return!1},r.prototype.getByEquality=function(t){for(var e=this.newIterator(),i=null;null!==(i=e.getCurrent());){if(i===t||n.isFunction(i.equals)&&i.equals(t))return i;e.next()}return null},r.prototype.size=function(){return this._size};var o=function(t,e){this.elem=t,this.next=e};(r.QueueIterator=function(t){this._ptr=t}).prototype.getCurrent=function(){return null===this._ptr?null:this._ptr.elem},r.QueueIterator.prototype.next=function(){this._ptr=null===this._ptr?null:this._ptr.next},t.exports=r},function(t,e,i){var n=i(3),r=i(0);function o(){n.call(this),this._entryKeys={}}o.prototype=new n,o.prototype.constructor=o,o.prototype.insert=function(t){this._entryKeys[t.getKey()]||(this._entryKeys[t.getKey()]=!0,n.prototype.insert.call(this,t))},o.prototype.clear=function(){this._entryKeys={},n.prototype.clear.call(this)},o.prototype.extractMax=function(){var t=n.prototype.extractMax.call(this);return t&&r.isFunction(t.getKey)&&this._entryKeys[t.getKey()]&&delete this._entryKeys[t.getKey()],t},o.prototype.contains=function(t){return!0===this._entryKeys[t.getKey()]},o.prototype.remove=function(t){n.prototype.remove.call(this,t),this._entryKeys[t.getKey()]&&delete this._entryKeys[t.getKey()]},o.prototype.pop=o.prototype.extractMax,o.prototype.poll=o.prototype.extractMax,o.prototype.push=o.prototype.insert,t.exports=o},function(t,e,i){"use strict";i.r(e);var n=i(1),r=i.n(n),o=i(4),s=i.n(o),a=i(2),p=i.n(a),h=i(3),u=i.n(h),f=i(5),l=i.n(f),c=i(6),y=i.n(c),_=i(0),v=i.n(_);"undefined"!=typeof window&&window&&(window.SL=window.SL||{},window.SL.Event=r.a,window.SL.EventManager=s.a,window.SL.EventNotifierMixin=p.a,window.SL.PriorityQueue=u.a,window.SL.Queue=l.a,window.SL.UniquePriorityQueue=y.a,window.SL.Utils=v.a)}]);