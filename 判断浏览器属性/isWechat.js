var ua = navigator.userAgent.toLowerCase(),
    isWechat = ua.indexOf('micromessenger') != -1;
if(isWechat){
    ...
}