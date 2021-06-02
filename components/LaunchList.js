import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled, { keyframes } from "styled-components"
import LaunchCard from './LaunchCard'

import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Container = styled.div` 

`

const LaunchWrapp = styled.div`  
  padding-top: 128px;
  padding-left: 64px;
  padding-right: 32px;
  padding-bottom: 32px;
  display: flex;
  gap: 64px;
  flex-wrap: wrap;
`

const Item = styled.div`
  flex: 1;
  min-width: 400px;
  
  
`


const animationName = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingWrapp = styled.div`
  padding-Top: 36px;
  padding-bottom: 48px;
  margin-left: 50%;
`

const Loading = styled.div`
  animation: ${animationName} 1.2s linear infinite;
  border: 6px solid rgba(255, 255, 255, 0.7);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
`

const AllLoad = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: 400;
  margin-left: -156px;
  color: ${({ theme }) => theme.colors.text};

`



export default function LaunchList() {

  const [launches, setLaunches] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [allLoading, setAllLoading] = useState(false)



  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  useEffect(() => {
    postData('https://api.spacexdata.com/v4/launches/query', {
      "query": {},
      "options": {
        page: page,
        limit: 20,
      },
    })
      .then((data) => {
        console.log("data", data); // JSON data parsed by `response.json()` call
        setLaunches(data.docs)
        setPage(2)
        setLoading(false)
        if (!data.hasNextPage) setAllLoading(true)
        console.log("launches", launches)
      });
  }, [])

  const bottomLoading = () => {
    if (!allLoading) {
      console.log("Upload")
      setLoading(true)
      postData('https://api.spacexdata.com/v4/launches/query', {
        "query": {},
        "options": {
          page: page,
          limit: 20,
        },
      })
        .then((data) => {
          console.log("data", data); // JSON data parsed by `response.json()` call
          setLaunches([...launches, ...data.docs])
          let newPage = page + 1
          setLoading(false)
          if (!data.hasNextPage) setAllLoading(true)
          setPage(newPage)

        });
    }
  }

  useBottomScrollListener(bottomLoading, {
    offset: 200,
    // debounce: 0,
    // triggerOnNoScroll: true
  });

  return (
    <Container>
      <LaunchWrapp>
        {launches.map((item) =>
          <Item key={item.id}>
            <LaunchCard name={item.name} details={item.details} success={item.success} date={item.date_utc} patch={item.links.patch.small} />
          </Item>
        )}
      </LaunchWrapp>

      <LoadingWrapp>
        {loading && <Loading />}
        {allLoading && <AllLoad>
          All launches are loaded
        </AllLoad>}
      </LoadingWrapp>

    </Container>
  )
}