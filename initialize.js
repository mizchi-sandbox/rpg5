var _include_,_module_;_module_=function(e){return function(t,n,r){var i,s,o,u,a,f,l;r==null&&(r=o),o=(f=typeof window!=="undefined"&&window!==null?window:global)!=null?f:e,r==null&&(r=o),i=[],l=t.split(".");for(u=0,a=l.length;u<a;u++)s=l[u],r[s]==null&&(r[s]={}),r=r[s],i.push(r);return n.apply(r,i)}}(this),_include_=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return t};
_module_('A', function (A) {
    this.A = function () {
        function A() {
        }
        ;
        return A;
    }();
});
$(function () {
    var a;
    a = new A.A();
    return console.log('initialized!', a);
});