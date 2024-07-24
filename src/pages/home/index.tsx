import React from "react";
import styles from "./index.module.scss";
import { useRequest } from "@/hooks/useRequest";
import { ErrorBlock, Swiper, Space, Image } from "@/bases";
import Loading from "@/components/loading";
import api from "./api";
import { IHomeData } from "./types";
import Header from "./components/header";
import NavBar from "./components/navbar";
import Popular from "./components/popular";
import Recommond from "./components/recommend";
import LimitedRead from "./components/limited-read";
import Ranking from "./components/ranking";

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
    <>

      <header className={styles.header}>
      <Header />
        <Space
          direction="vertical"
          gap={`${20/37.5}rem`}
        >
          <Swiper style={{ borderRadius: 12 }}>
            {data!.banner.map((item) => (
              <Swiper.Item key={item.src}>
                <Image src={item.src} alt={item.alt}/>
              </Swiper.Item>
            ))}
          </Swiper>
          <nav>
            <NavBar />
          </nav>
          <Popular />
          <Recommond />
          <LimitedRead />
          <Ranking />
        </Space>
      </header>
      <main className={styles.main}>

      </main>
    </>
  );
};

export default Home;
