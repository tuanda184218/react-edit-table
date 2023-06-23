import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import { useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import { fakeProducts } from '../../data/data';

import './homepage.css';
// ...

const HomePage = () => {
  // sort
  const handleColumnSort = (dataField) => {
    // Tạo một bản sao của mảng columns để thay đổi giá trị
    const newColumns = [...tableColumns];

    // Tìm cột mà bạn muốn sắp xếp
    const sortColumn = newColumns.find((column) => column.dataField === dataField);

    if (sortColumn) {
      // Đảo ngược giá trị sortOrder khi cùng một cột được ấn
      sortColumn.sortOrder = sortColumn.sortOrder === 'asc' ? 'desc' : 'asc';

      // Sắp xếp dữ liệu dựa trên sortColumn
      currentFakeProducts.sort((a, b) => {
        if (sortColumn.sortOrder === 'asc') {
          return a[dataField] - b[dataField];
        } else {
          return b[dataField] - a[dataField];
        }
      });

      // Cập nhật lại giá trị cho bảng
      setTableColumns(newColumns);
    }
  };

  // compute the width of the first column in table in order to css
  window.addEventListener('DOMContentLoaded', function () {
    var firstColumnWidth = document.querySelector('.table-scroll th:first-child').offsetWidth;
    console.log('Độ rộng của cột thứ nhất:', firstColumnWidth, 'px');
  });

  //start pagination
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // console.log(111, selected);
  };
  const handleSelectPerPage = (eventKey, event) => {
    setPerPage(eventKey);
  };
  const currentFakeProducts = fakeProducts.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage,
  );
  //end pagination

  let columns = [
    {
      dataField: 'id',
      text: 'Product ID',
      editable: false,
      hidden: false,
      headerStyle: () => {
        return { backgroundColor: '#ffff99' }; // Màu nền vàng cho cột
      },
      footer: 'Footer 1',
      sort: true, // Cho phép sắp xếp cột
      sortCaret: (order, column) => {
        if (order === 'asc') {
          return <span className='react-bootstrap-table-sort-order'>▲</span>;
        } else {
          return <span className='react-bootstrap-table-sort-order'>▼</span>;
        }
      },
      headerEvents: {
        onClick: () => handleColumnSort('id'), // Gọi hàm xử lý sắp xếp khi ấn vào tên cột
      },
    }, // column can not edit
    {
      dataField: 'name',
      text: 'Product Name',
      editable: false,
      headerStyle: () => {
        return { backgroundColor: '#ffff99' }; // Màu nền vàng cho cột
      },
      footer: 'Footer 2',
    },
    {
      dataField: 'price',
      text: 'Product Price',
      style: (cell, row) => {
        if (row.price < 2102) {
          return { backgroundColor: '#ff9999' }; // Màu nền đỏ cho các giá trị nhỏ hơn 2102
        }
        return {};
      },

      validator: (newValue, row, column) => {
        // validate
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: 'Price should be numeric',
          };
        }
        return true;
      },
      footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0), //footer
    },
    { dataField: 'description', text: 'Product description' },
    { dataField: 'a', text: 'a', classes: 'custom-width-column' }, // 'custom-width-column : css increasing width for columns
    {
      dataField: 'b',
      text: 'b',
      editor: {
        type: Type.SELECT, // drop down selection
        options: [
          {
            value: 'A',
            label: 'A',
          },
          {
            value: 'B',
            label: 'B',
          },
          {
            value: 'C',
            label: 'C',
          },
          {
            value: 'D',
            label: 'D',
          },
          {
            value: 'E',
            label: 'E',
          },
        ],
      },
    },
    { dataField: 'c', text: 'c' },
    { dataField: 'd', text: 'd' },
    { dataField: 'e', text: 'e' },
    { dataField: 'f', text: 'f' },
    { dataField: 'g', text: 'g' },
    { dataField: 'h', text: 'h' },
    { dataField: 'i', text: 'i' },
    { dataField: 'k', text: 'k' },
    { dataField: 'l', text: 'l' },
    { dataField: 'm', text: 'm' },
    { dataField: 'n', text: 'n' },
    { dataField: 'o', text: 'o' },
    { dataField: 'p', text: 'p' },
    { dataField: 'q', text: 'q' },
    { dataField: 'r', text: 'r' },
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // const handleActionSelect = (eventKey, colIndex) => {
  //   console.log(`Selected action: ${eventKey} for col with ID: ${colIndex}`);
  //   //check event key
  //   // Xóa cột khỏi danh sách cột
  //   const newColumn = columns.filter((col, index) => index !== colIndex);
  //   columns = newColumn;
  //   setTableColumns(newColumn);
  // };

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'popover' : undefined;

  //modal
  const modalColumns = tableColumns.slice(2);
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(columns.map((column) => column.dataField));

  // handle hiden columns
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const handleCheckboxChange = (event, dataField) => {
    if (event.target.checked) {
      setSelectedColumns([...selectedColumns, dataField]);
      setHiddenColumns([...hiddenColumns, dataField]);
    } else {
      setHiddenColumns(hiddenColumns.filter((column) => column !== dataField));
      setSelectedColumns(selectedColumns.filter((column) => column !== dataField));
    }
  };
  const visibleColumns = tableColumns.filter((column) =>
    selectedColumns.includes(column.dataField),
  );

  return (
    <div className='table-scroll'>
      <div>
        <div className='actions'>
          <Popup
            trigger={<button className='button'> Menu Demo </button>}
            position='right top'
            closeOnDocumentClick
            contentStyle={{ padding: '0px', border: 'none' }}
          >
            <div className='menu'>
              <div className='menu-item' onClick={() => setShowModal(true)}>
                Menu item 1
              </div>
              <div className='menu-item'> Menu item 2</div>
              <div className='menu-item'> Menu item 3</div>
              <div className='menu-item'> Menu item 4</div>
            </div>
          </Popup>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Columns</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalColumns.map((column) => (
              <div key={column.dataField}>
                <label>
                  <input
                    type='checkbox'
                    checked={selectedColumns.includes(column.dataField)}
                    onChange={(event) => handleCheckboxChange(event, column.dataField)}
                  />
                  {column.text}
                </label>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </div>
      <div className='table-wrap'>
        <div className='main-table'>
          <BootstrapTable
            keyField='id'
            data={currentFakeProducts}
            columns={visibleColumns}
            cellEdit={cellEditFactory({
              mode: 'dbclick', //double click to edit
              blurToSave: true,
              // nonEditableRows: () => [0, 2], // row 0 and 2 can not edit
              onStartEdit: (row, column, rowIndex, columnIndex) => {
                console.log('start to edit!!!');
              }, // dbclick => clg
              beforeSaveCell: (oldValue, newValue, row, column) => {
                console.log('Before Saving Cell!!', row);
              },
              afterSaveCell: (oldValue, newValue, row, column) => {
                console.log('After Saving Cell!!');
              },
            })}
            wrapperClasses='fixed-columns'
            // pagination={paginationFactory(option1)}
            // sort={{
            //   sortColumn: sortColumn,
            //   sortOrder: sortOrder,
            // }}
          />
        </div>
      </div>
      <div>
        <Dropdown onSelect={handleSelectPerPage}>
          <Dropdown.Toggle variant='primary' id='dropdown-status'>
            {perPage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item key={0} eventKey={5}>
              5
            </Dropdown.Item>
            <Dropdown.Item key={1} eventKey={10}>
              10
            </Dropdown.Item>
            <Dropdown.Item key={2} eventKey={15}>
              15
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={Math.ceil(fakeProducts.length / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default HomePage;
