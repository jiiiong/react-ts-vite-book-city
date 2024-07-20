import React from "react";
import Header from "./components/header";
import styles from "./index.module.scss";
import { useRequest } from "@/hooks/useRequest";
import { ErrorBlock, Swiper } from "@/bases";
import Loading from "@/components/loading";
import api from "./api";
import { IHomeData } from "./types";

const Home: React.FC = () => {
  const { data, isLoading, error } = useRequest<IHomeData>({
    url: api.getHomeData,
  });
  console.log(data, isLoading, error);
  if (error) {
    return <ErrorBlock />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <header className={styles.header}>
      <Header />
      <Swiper
      style={{borderRadius: 12}}
      >
        {data!.banner.map((item) => (
          <Swiper.Item key={item.src}>
            <img src={item.src} alt={item.alt}
              height="100%"
              width="100%"
            />
          </Swiper.Item>
        ))}
      </Swiper>
      {data?.limited[0].author}
    </header>
  );
};

export default Home;
