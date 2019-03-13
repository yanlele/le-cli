import loadableComponent from './loadableComponent';
import React from "react";
import {RouteComponentProps} from "react-router";

interface IPages {
  [key: string]: Function;
}

interface IExportPages {
  [key: string]: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const CounterContainer = () => import('pages/CounterContainer');
const HomeContainer = () => import('pages/HomeContainer');
const NoMatchContainer = () => import('pages/NoMatchContainer');

const pages: IPages = {
  CounterContainer,
  HomeContainer,
  NoMatchContainer,
};

// Object.keys(pages).forEach((key: string) => loadableComponent(pages[key]));

const exportPages: IExportPages = {};
Object.keys(pages).forEach((key: string) => {
  exportPages[key] = loadableComponent(pages[key]);
});

export default exportPages;
