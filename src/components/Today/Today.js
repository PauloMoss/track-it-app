import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";

import UserContext from '../../contexts/UserContext';
import PercentageContext from '../../contexts/PercentageContext';
import {HabitDayStatus} from './Styles';
import Date from './Date';
import HabitToday from './HabitToday';
import Header from '../Header_Menu/Header';
import Menu from '../Header_Menu/Menu';

export default function Today() {
    
    const { userProfile } = useContext(UserContext);
    const { todayPercentage, setTodayPercentage } = useContext(PercentageContext);
    const [habitsToday, setHabitsToday] = useState(null);
    const loading = <Loader type="ThreeDots" color="#FFFFFF" height={19} width={50}/>
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userProfile.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then(r => {
            setHabitsToday(r.data);
            setTodayPercentage( (r.data.length > 0) ? r.data.filter(h => h && h.done).length/r.data.length : 0  );
        });
        request.catch(()=> alert("Ocorreu um erro."))
    },[userProfile.token]
    );

    const noHabitsFinishedYet = <HabitDayStatus color={"#BABABA"}>Nenhum hábito concluído ainda</HabitDayStatus>
    const todayFinishedHabits = <HabitDayStatus color={"#8FC549"}>{(todayPercentage * 100).toFixed(0)} % dos habitos concluidos</HabitDayStatus>
    const todayHabitsList = habitsToday && (habitsToday.length > 0) ? habitsToday.map((h, i) => <HabitToday key={h.id} index={i} habitToday={h} setHabitsToday={setHabitsToday} habitsToday={habitsToday}/>) : "Nenhum Habito Hoje";
    
    return(
        <>
            <Header />
            <Date />
            {(todayPercentage === 0) ? noHabitsFinishedYet : todayFinishedHabits}
            {habitsToday !== null ? todayHabitsList : loading}

            <Menu />
        </>
    );
}