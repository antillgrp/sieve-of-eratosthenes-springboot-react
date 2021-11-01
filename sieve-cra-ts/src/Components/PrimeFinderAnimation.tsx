import * as React from 'react';

import * as mui from '@mui/material';

const arrDeepCopy = (arr:any) => {
    let copy: any = [];
    arr.forEach((elem:any) => {
        if(Array.isArray(elem)){
            copy.push(arrDeepCopy(elem));
        }
        //   else{
        //     if (typeof elem === 'object') {
        //       copy.push(deepCopyObject(elem))
        //   }
        else {
            copy.push(elem)
        }
    });
    return copy;
}

const timer = {
    running: false,
    iv: 5000,
    timeout: -1,
    cb : function(){},
    start : function(cb:any,iv:any){
        var elm = this;
        clearInterval(this.timeout);
        this.running = true;
        if(cb) this.cb = cb;
        if(iv) this.iv = iv;
        this.timeout = window.setTimeout(function(){elm.execute(elm)}, this.iv);
    },
    execute : function(e:any){
        if(!e.running) return false;
        e.cb();
        e.start();
    },
    stop : function(){
        this.running = false;
    },
    set_interval : function(iv:any){
        clearInterval(this.timeout);
        this.start(false, iv);
    }
};

const colors = [
    "Salmon","Tan",
    "Aqua","BlueViolet",
    "Coral","Cyan",
    "DodgerBlue","GreenYellow"
];

//var timerId: number;

export default function PrimeFinderAnimation(
    { data }:{ data: any } //https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript#typing-immediately-destructured-parameters
){
    //console.log(data);

    const [ multiplesColors ] = React.useState(
        data.multiplesLists
        .map(() => {
            let color = colors[0];
            colors.push(colors.shift() || "white");
            return color;
        })
    );

    const getBgColors = (value: number) => {

        let bgColors = [];

        data.multiplesLists.forEach((
            nextArr: number[],
            index: number
            ) =>
            {
                if(nextArr.includes(value)){
                    bgColors.push(multiplesColors[index]);
                }
            });

        if(data.primes.includes(value)) bgColors.push("red");

        return bgColors;
    };

    const [
        state
        ,setState
    ] = React.useState(
        {
            primesLabel:"Primes: ",
            data:{
                n: data.n,
                primes:[...data.primes],
                multiplesLists: arrDeepCopy(data.multiplesLists)
            },
            animationArray: data.multiplesLists.flat()/*.concat([...data.primes])*/,
            startedWithPrimes: false,
            colorMatrix:[...new Array(Math.ceil(data.n/10))]
                        .map(
                            (rv,row) =>
                                [...new Array(10)]
                                .map((cv,col)=>{
                                    return {
                                        value: row * 10 + col + 1,
                                        bgColor: "white",
                                        nextBgColors: getBgColors(row * 10 + col + 1)
                                    };
                                })
                        ),
        }
    );

    const setNextCellColor = () => {

        if(state.animationArray.length <= 0) {
            if(!state.startedWithPrimes){
                state.animationArray = [...state.data.primes];
                state.startedWithPrimes = true;
                timer.set_interval(500);
            }
            else{
                //clearInterval(timerId);
                timer.stop();
                return;
            }
        }

        let cell = state.animationArray.shift();

        let colorMatrix = state.colorMatrix;

        for (let i = 0; i < colorMatrix.length; i++)
            for(let j = 0; j < colorMatrix[i].length; j++){
                colorMatrix[i][j].bgColor = cell === colorMatrix[i][j].value
                                            ?
                                            colorMatrix[i][j].nextBgColors.shift()
                                            ||
                                            colorMatrix[i][j].bgColor
                                            :
                                            colorMatrix[i][j].bgColor;
            }

        state.primesLabel += (state.startedWithPrimes ? " " + cell + "," : "");

        setState({
            ...state,
            primesLabel: state.primesLabel,
            colorMatrix: colorMatrix
        });
    };

    React.useEffect(() => {

        // timerId = window.setInterval(() => {
        //     console.log("launching setNextCellColor");
        //     setNextCellColor();
        // }, 3000);

        timer.start(
            () => setNextCellColor()
        ,200);

        return () => {
          //clearInterval(timerId);
          timer.stop();
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []);

    return (
        <mui.Grid container direction="column" spacing={2}>
        <mui.Grid item>
            {
                state.primesLabel.endsWith(",")
                ?
                state.primesLabel.slice(0, -1)
                :
                state.primesLabel
            }
        </mui.Grid>
        <mui.Grid item>
        <mui.TableContainer component={mui.Paper}>
            <mui.TableBody>
            {
                state.colorMatrix
                .map((rv,row)=>{
                    return (
                        <mui.TableRow
                            key={row}
                        >
                        {
                            rv
                            .map((cv,col)=>{
                                return (
                                    <mui.TableCell
                                        key={cv.value}
                                        style={{
                                            backgroundColor: state.colorMatrix[row][col]
                                                            .bgColor
                                        }}
                                    >
                                        {
                                            cv.value <= state.data.n
                                            ? cv.value
                                            : ""
                                        }
                                    </mui.TableCell>
                                );
                            })
                        }
                        </mui.TableRow>
                    );
                })
            }
            </mui.TableBody>
        </mui.TableContainer>
        </mui.Grid>
        </mui.Grid>
    );
}
