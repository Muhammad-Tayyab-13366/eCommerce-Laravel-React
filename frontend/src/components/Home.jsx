import React from 'react'
import { LatestProducts } from './LatestProducts';
import { FeaturedProducts } from './FeaturedProducts';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import { Hero } from './common/Hero';
import { Layout } from './common/Layout';

export const Home = () => {
  return (
    <>
      <Layout>
          <Hero/>
          <LatestProducts/>
          <FeaturedProducts/>
      </Layout>
      </>
    )
  }
