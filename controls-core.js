(function(root){
 function directionsAt(x,y,width,height){
  const dx=(x-width/2)/(width/2),dy=(y-height/2)/(height/2),ax=Math.abs(dx),ay=Math.abs(dy);
  if(ax>1.35||ay>1.35||Math.hypot(dx,dy)<.22)return [];
  const keys=[],threshold=Math.tan(Math.PI/8);
  if(ax>=ay*threshold)keys.push(dx<0?'ArrowLeft':'ArrowRight');
  if(ay>=ax*threshold)keys.push(dy<0?'ArrowUp':'ArrowDown');
  return keys;
 }
 function createInputState(emit){
  const sources=new Map();let held=new Set();
  function update(source,keys,immediate=false){
   if(keys.length)sources.set(source,new Set(keys));else sources.delete(source);
   const next=new Set([...sources.values()].flatMap(s=>[...s]));
   for(const key of held)if(!next.has(key))emit(key,false,immediate);
   for(const key of next)if(!held.has(key))emit(key,true,immediate);
   held=next;return new Set(held);
  }
  function clear(){for(const key of held)emit(key,false,true);sources.clear();held.clear();return new Set()}
  return {update,clear};
 }
 const api={directionsAt,createInputState};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcadeControls=api;
})(typeof window==='object'?window:globalThis);
