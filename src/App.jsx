import React, { useEffect, useState } from 'react';
import Countries from '../countries/Countries';
import axios from "axios";
// import Card from '../Card/Card';
import "./XCountriesSearch.css";

const XCountriesSearch = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    useEffect(()=>{
        fetchCountries();
    }, [])

    // useEffect(()=>{
        // searchCountries();
    // }, [searchText])

    const fetchCountries = async ()=>{
        const url = "https://restcountries.com/v3.1/all"
        try{
            const res = await axios.get(url);
            
            if (res.status !== 200) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            setData(res.data)
        }catch(error){
            console.error(error);
        }
        // console.log(data);
    }

    //        c
    //I N D I A

    //  i
    //I A
    const searchCountries = (str)=>{
        
        if(!str || !str.length) return setFilteredData(null);

        // const filteredCountries = ;
        setFilteredData(data.filter((country) => country.name.common.toLowerCase().includes(str.toLowerCase())))
    }
    const Card = (props) => {
        const { image, name} = props;
        return (
            <div className='card container' style={{flexDirection: 'column'}}>
                <img src={image} alt={`${name} flag`} />
                <h2>{name}</h2>
            </div>
        );
    };

    const displayFLags = ()=>{
        // let arr = filteredData && filteredData?.length ? filteredData : data;
        let arr = filteredData ? filteredData : data;
        return arr?.map(cou=> <Card key={cou?.cca3} image={cou?.flags?.png} name={cou?.name?.common}/>);

    }

    const handleSearch = evt=>{
        setSearchText(evt.target.value)
        searchCountries(evt.target.value);
    }

    return (
        data.length &&
        <div className='XCountriesSearch'>
            <input  type='text' value={searchText} onChange={handleSearch}/>
            {/* <div className='countriesBody' style={{display: "flex", flexDirection: "column", alignItems: "center"}}> */}
            <div className='countriesBody countriesWrapper'>
                {displayFLags()}
            </div>
        </div>
    );
};

export default XCountriesSearch;