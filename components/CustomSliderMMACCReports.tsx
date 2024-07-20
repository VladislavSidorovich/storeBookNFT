"use client";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SliderItemNotBlockchainMMACCReports from "./SliderItemNotBlockchainMMACCReports";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { Titles, useTitlesData } from "../methods/blockchain/readContract";
import { getAddressNFTdataCounters } from "../methods/blockchain/readContractCore";
import {
  setProducts,
  setCompletedIds,
  setAllProductsToNotCompleted,
} from "../store/features/orderSlice";
import { useAppDispatch } from "../store/hooks";
import { useAccount } from "wagmi";
import {
  filterMultipleTitleCountersResult,
  filterTitleResult,
} from "../utils/converter";
import Lottie from "lottie-react";
import animation from "../static/lottie/loadingAnimation.json";
import { networkInterfaces } from "os";

const combinedData = [
  {
    id: 1,
    name: "Обустройство как эманация Духа",
    price: "",
    supplyRemain: 10,
    uri: "uri1",
    previewText: "Превью статьи 1",
    actionText: "Читать статью 1",
  }
];

const Index = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      navigation
      pagination={{ clickable: true }}
      className="custom-swiper"
    >
      {combinedData.map((item) => (
        <SwiperSlide key={item.id}>
          <SliderItemNotBlockchainMMACCReports
            id={item.id}
            name={item.name}
            price={item.price}
            supplyRemain={item.supplyRemain}
            uri={item.uri}
            previewText={item.previewText}
            actionText={item.actionText}
          />
        </SwiperSlide>
      ))}
      
    </Swiper>
  );
};

export default Index;