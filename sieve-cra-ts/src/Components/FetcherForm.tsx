import * as React from 'react';
//import axios from 'axios'

import * as mui from '@mui/material';

export default function FetcherForm(props: {callBackSetData:(data: any) => void}) {

    const [nValue, setnValue] = React.useState(
        {value:10, valid:true}
    );

    const handleSubmit = async (e: any) => {

        e.preventDefault()

        //try fetch
        const response = await window.fetch(
            //"http://localhost:8080/sieve/" +  nValue.value
            "/sieve/" +  nValue.value
        );

        if(!response.ok){
            alert("error fetching");
            return;
        }

        let data = await response.json();

        data = {
            ...data,
            multiplesLists: data.multiplesLists
                            .filter((arr: number[]) => arr.length > 0)
        };

        console.log(data);

        props.callBackSetData(data);
    };

    return (
        <>
        <form
            onSubmit={handleSubmit}
        >
            <mui.Grid
                container
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <mui.Grid item >
                    <mui.TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 2 }}
                        InputLabelProps={{shrink: true}}
                        value={nValue.value}
                        error={!nValue.valid}
                        onChange={(e: any) => setnValue({value:e.target.value, valid:e.target.value >= 2})}
                    />
                </mui.Grid>
                <mui.Grid item >
                    <mui.Button
                        variant="outlined"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Calculate
                    </mui.Button>
                </mui.Grid>
            </mui.Grid>
        </form>
        </>
    );
}
