const test=require('node:test');const assert=require('node:assert/strict');
const {directionsAt,createInputState}=require('../controls-core.js');
test('eight directions, center dead zone, and slide outside the pad',()=>{
 const cases=[[100,50,['ArrowRight']],[100,0,['ArrowRight','ArrowUp']],[50,0,['ArrowUp']],[0,0,['ArrowLeft','ArrowUp']],[0,50,['ArrowLeft']],[0,100,['ArrowLeft','ArrowDown']],[50,100,['ArrowDown']],[100,100,['ArrowRight','ArrowDown']],[50,50,[]],[250,50,[]]];
 for(const [x,y,expected] of cases)assert.deepEqual(directionsAt(x,y,100,100),expected);
 assert.deepEqual(directionsAt(200,0,200,200),['ArrowRight','ArrowUp']);
});
test('one continuous pointer can slide right to diagonal to up and release',()=>{
 const events=[];const state=createInputState((...e)=>events.push(e));
 for(const point of [[100,50],[100,0],[50,0]])state.update('finger1',directionsAt(...point,100,100),true);
 state.update('finger1',[],true);
 assert.deepEqual(events,[['ArrowRight',true,true],['ArrowUp',true,true],['ArrowRight',false,true],['ArrowUp',false,true]]);
});
test('releasing one finger does not release another input source',()=>{
 const events=[];const state=createInputState((...e)=>events.push(e));
 state.update('finger1',['ArrowRight'],true);state.update('keyboard',['ArrowRight']);state.update('finger2',['z']);state.update('finger1',[],true);
 assert.equal(events.filter(e=>e[0]==='ArrowRight'&&!e[1]).length,0);
 state.clear();assert.deepEqual(events.slice(-2),[['ArrowRight',false,true],['z',false,true]]);
 state.update('finger1',[],true);assert.equal(events.length,4);
});
