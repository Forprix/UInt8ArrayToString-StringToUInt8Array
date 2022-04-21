Uint8Array.prototype.pack = function() {
    let l = this.length % 2
    let a = new Uint8Array(this.length + l)
    a.set(this)
    let u = new Uint16Array(a.buffer)
    let s = l ? "\u0001" : "\u0000"
    for (let v of u)
        s += String.fromCharCode(v)
    return s
}
ArrayBuffer.prototype.pack = function() {
    return Uint8Array.prototype.pack.call(new Uint8Array(this))
}
String.prototype.unpack = function() {
    let a = new Array((this.length - 1) * 2)
    for (let i = 1, l = 0, c, s; i < this.length; i++, l++) {
        c = this.charCodeAt(i)
        s = ~~(c / 256)
        a[l++] = c - s * 256
        a[l] = s
    }
    if (this.charCodeAt(0) === 1)
        a.pop()
    return new Uint8Array(a)
}