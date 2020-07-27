import React, { useState, useEffect } from 'react';
import axios from 'axios-typescript';
import { IIssue } from '../Models/IIssue';
import { Pagination, PaginationProps } from 'semantic-ui-react';
import { IIssueResult } from '../Models/IIssueResult';

const useSearchIssues = (
  searchField: string,
  itemsPerPage: number,
  pageNo: number
): IIssueResult => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async function fetchIssue() {
      try {
        const response = await axios.get(
          `https://api.github.com/search/issues?q=${searchField}/repo:facebook/react/node+type:issue&per_page=${itemsPerPage}&page=${pageNo}`
        );
        const { total_count, items } = JSON.parse(response.data);
        setTotalPages(total_count);
        setResults(items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchField, pageNo]);

  return { totalPages: totalPages, items: results };
};

const Search = () => {
  const [term, setTerm] = useState('componentdidmount');
  const [searchField, setSearchField] = useState('componentdidmount');
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalPages, items } = useSearchIssues(
    searchField,
    itemsPerPage,
    pageNo
  );

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchField(term);
    }
  };

  const handlePaging = (data: PaginationProps) => {
    const page = data.activePage ? '1' : data.activePage;
    const pageNo = Number(page);
    setPageNo(pageNo);
  };

  const pagination = (
    <Pagination
      defaultActivePage={pageNo}
      totalPages={totalPages}
      onPageChange={(event, data: PaginationProps) => handlePaging(data)}
    />
  );

  const renderedResults = items.map((result: IIssue) => {
    return (
      <div key={result.id}>
        <div className="ui three column padded grid">
          <div className="column">{result.id}</div>
          <div className="column">{result.title}</div>
          <div className="column">{result.user.login}</div>
        </div>
        <div className="ui divider"></div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Owner/Repo</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
            placeholder="Search.. (On enter key)"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleSearch(e)
            }
          />
        </div>
      </div>
      <div>
        <div key="-1">
          <div className="ui three column padded grid">
            <div className="column" style={{ fontWeight: 'bold' }}>
              Id
            </div>
            <div className="column" style={{ fontWeight: 'bold' }}>
              Title
            </div>
            <div className="column" style={{ fontWeight: 'bold' }}>
              User
            </div>
          </div>
          <div className="ui divider"></div>
        </div>
        {renderedResults}
      </div>
      <div style={{ float: 'right', padding: '10px' }}>{pagination}</div>
    </div>
  );
};

export default Search;
