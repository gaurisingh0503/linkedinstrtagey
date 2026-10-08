"""Original synthesized notification cues; no third-party recording required.
Arrival formulas mirror src/content.ts; regenerate after changing timing.
"""
import math, wave, array
from pathlib import Path
RATE=48000
ROOT=Path(__file__).resolve().parents[1]
def make(name,duration,arrivals,reveal):
 data=[0.0]*int(RATE*duration)
 def tone(start,length,freq,amp,fall=26):
  for i in range(int(length*RATE)):
   t=i/RATE; idx=int(start*RATE)+i
   if idx>=len(data): break
   envelope=min(1,t/.004)*math.exp(-fall*t)*min(1,(length-t)/.02)
   data[idx]+=amp*envelope*(math.sin(2*math.pi*freq*t)+.22*math.sin(2*math.pi*freq*2*t))
 for i,start in enumerate(arrivals):
  # Quantize to the same first visible video frame.
  start=math.ceil(start*30)/30
  tone(start,.15,880,.11 if i<5 else .065)
  tone(start+.045,.17,1320,.08 if i<5 else .045)
 tone(reveal,.48,65,.28,9);tone(reveal,.14,1760,.14,32)
 out=array.array('h',(int(max(-.95,min(.95,x))*32767) for x in data))
 with wave.open(str(ROOT/'public'/name),'wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(RATE);w.writeframes(out.tobytes())
make('version-a.wav',15,[0]+[2+i*.65 if i<5 else 5+4.65*((i-5)/43)**.65 for i in range(49)],10.4)
make('version-b.wav',12,[1+7.7*(i/48)**.63 for i in range(49)],11)
