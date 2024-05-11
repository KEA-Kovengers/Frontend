import React from 'react';
import axios from 'axios';
import { useEffect,useState, useRef } from 'react';
import AppCardData from './data/app-card-data';

import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard() {

  // 카드 내 데이터를 가져옴 (이미지, 정보)
  const [data, setData] = AppCardData();
  const loadMoreRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // const [offset, setOffset] = useState(0);
  // const [target, setTarget] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [stop, setStop] = useState(false);

  // useEffect(() => {
  //   let observer;
  //   if (target && !stop) {
  //     // callback 함수로 onIntersect를 지정
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 1,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target, isLoaded]);

  // // isLoaded가 변할 때 실행
  // useEffect(() => {
  //   // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
  //   if (isLoaded && !stop) {
  //     axios
  //     /* 요청 url */
  //       .get( {
  //         headers: {},
  //         params: { offset: offset }
  //       })
  //       .then((res) => {
  //         // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
  //         setBeerList((data) => data.concat(res.data));
  //         // 다음 요청할 데이터 offset 정보
  //         setOffset((offset) => offset + res.data.length);
  //         // 다음 요청 전까지 요청 그만 보내도록 false로 변경
  //         setIsLoaded(false);
          
  //         if (res.data.length < 3) {
  //           // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
  //           setStop(true);
  //         }
  //       });
  //   }
  // }, [isLoaded]);

  // const getMoreItem = () => {
  //   // 데이터를 받아오도록 true 로 변경
  //   setIsLoaded(true);
  // };

  // // callback
  // const onIntersect = async ([entry], observer) => {
  //   // entry 요소가 교차되거나 Load중이 아니면
  //   if (entry.isIntersecting && !isLoaded) {
  //     // 관찰은 일단 멈추고
  //     observer.unobserve(entry.target);
  //     // 데이터 불러오기
  //     await getMoreItem();
      
  //     // 불러온 후 다시 관찰 실행
  //     observer.observe(entry.target);
  //   }
  // };

  
   // 새 데이터를 로드하는 함수
   async function getMoreItem() {
    // TODO: 실제로는 API 호출 등을 통해 데이터를 가져와야 합니다.
    // 이 예제에서는 임의의 데이터를 반환합니다.
    return [
      {
        id: data.length, // 새 항목의 ID는 현재 데이터의 길이로 설정
        image: { src: '/assets/images/covers/cat.jpg' },
        info: {
          userImage: '/assets/images/avatars/avatar_9.jpg',
          title: '새로운 항목',
          userName: 'New User',
          date: '2024-04-01',
        }
      }
    ];
  }

    // onIntersect 함수는 getMoreItem 함수를 호출하여 새 데이터를 가져오고, setData를 사용하여 이를 기존 data 상태에 추가
    // callback
    const onIntersect = async ([entry], observer) => {
      // entry 요소가 교차되거나 Load중이 아니면
      if (entry.isIntersecting && !isLoaded) {
        // 관찰은 일단 멈추고
        observer.unobserve(entry.target);
        // 데이터 불러오기
        const newItems = await getMoreItem();
        setData(prevData => [...prevData, ...newItems]); // 새 데이터를 기존 데이터에 추가
        setIsLoaded(true);
        // 불러온 후 다시 관찰 실행
        observer.observe(entry.target);
      }
    };

    // useEffect를 사용하여 IntersectionObserver를 생성하고 관찰 대상을 설정
    useEffect(() => {
      let observer;
      if (loadMoreRef.current) {
        observer = new IntersectionObserver(onIntersect, { threshold: 1.0 });
        observer.observe(loadMoreRef.current);
      }
  
      return () => observer && observer.disconnect();
    }, [loadMoreRef, isLoaded]);

  return (

    <div>
    {data.map(item => (
      <div key={item.id}>
        <AppCardImage images={[item.image]} />
        <AppCardInfo info={[item.info]} />
      </div>
    ))}

  {/*
    <div ref={setTarget}></div>
  */}
  
  <div ref={loadMoreRef}></div>

  </div>
  );
}
