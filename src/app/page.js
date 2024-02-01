"use client"
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from "react-icons/bs";
import { FaUserCheck} from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { Paginator } from 'primereact/paginator';
import Filter from '@/Components/Filter';

export default function App() {

  const params = useSearchParams();
  const page = params.get('page') || 1;

  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [titleSearch, setTitleSearch] = useState('');

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);

    const currentPage = Math.floor(event.first / event.rows) + 1;
    router.push(`?page=${currentPage}`);
  };


  const fetchData = async () => {
    setLoading(true);
    let apiUrl = `https://kep.uz/api/problems/?page=${page}`;

    if (difficultyFilter !== "") {
      apiUrl += `&difficulty=${difficultyFilter.toLowerCase()}`;
    }

    if (titleSearch.trim() !== '') {
      apiUrl += `&title=${encodeURIComponent(titleSearch)}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data.data);
      setTotalRecords(data.total);
      setFirst((page - 1) * rows);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [rows, difficultyFilter, titleSearch, page]);

  const handleDifficultyFilterChange = (event) => {
    setDifficultyFilter(event.target.value);
    router.push("?page=1")
  };
  const handleFilterSearch = (event) => {
    setTitleSearch(event.target.value)
    router.push("?page=1")
  }

  return (
    <div className="card">
      <Filter
        difficultyFilter={difficultyFilter}
        handleDifficultyFilterChange={handleDifficultyFilterChange}
        titleSearch={titleSearch}
        handleFilterSearch={handleFilterSearch}
      />
      <DataTable value={data} tableStyle={{ minWidth: '50rem'}} scrollHeight='65vh'>
        <Column
          field= "id"
          header="ID"
          sortable
          body={(rowData) => (
            loading ? <Skeleton /> : rowData.id
          )}
          style={{ width: '2%' }}
        />

        <Column
          field="title"
          header="Title"
          sortable
          body={(rowData) => (
            loading ? <Skeleton /> : rowData.title
          )}
          style={{ width: '25%' }}
        />

        <Column
          field='tags'
          header="Tags"
          body={rowData => {
            if (rowData.tags) {
              return (
                loading ? <Skeleton /> :
                <div className='tags_parent_div'>
                  {rowData.tags.map((item, i) => (
                    <span className='tags_span' key={i}>{item.name}</span>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />

        <Column
          field="difficulty"
          header="Difficulty"
          body= {(rowData)=> (
            loading ? <Skeleton /> :
            <span
              className={`difficulty difficulty_${rowData.difficulty}`}
            >
              {rowData.difficultyTitle}
            </span>
          )}
          style={{ width: '10%', textAlign: 'center'}}
        />

        <Column
          field='likesCount'
          header="Rating"
          body={(rowData) => (
            loading ? <Skeleton /> :
            <div className='rating'>
              <span className='likes like'><BsFillHandThumbsUpFill /> <span>{rowData.likesCount}</span></span>
              <span className='likes dislike'><BsFillHandThumbsDownFill /> <span>{rowData.dislikesCount}</span></span>
            </div>
          )}
          sortable
          style={{ width: '10%' }}
        />

        <Column
          field="solved"
          header="Attempts"
          sortable
          body={(rowData) => (
            loading ? <Skeleton /> :
            <div className='attempts'>
              <span className='solved'><FaUserCheck />{rowData.solved}</span>
              <span className='notSolved'><FaUserTimes />{rowData.notSolved}</span>
            </div>
          )}
          style={{ width: '10%' }}
        />
      </DataTable>

      <Paginator
        first={first} rows={rows}
        totalRecords={totalRecords}
        pageLinkSize={10}
        onPageChange={onPageChange}
        style={{border: "none"}}
      />
    </div>
  );
}
