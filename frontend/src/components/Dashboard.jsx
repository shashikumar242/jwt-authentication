import React,{useEffect,useState} from 'react'
import Header from './header/Header';


const Dashboard = () => {
    const [data,setData] = useState([]);


    useEffect(()=>{
        fetchNamesList();
    },[])

    async function fetchNamesList(){
        try{

            const response = await fetch("http://localhost:5000/names-list",{
                method:'GET',
               credentials:"include"
            });
            
            if(response.ok){
                console.log('response of names list api');
                setData(response);
            }

        }catch(err){

        }
    }
  return (
    <div>
    <Header/>
    <div> I am the Dashboard</div>


    </div>
  )
}

export default Dashboard