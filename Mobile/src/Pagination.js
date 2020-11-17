import React from 'react';
import {Button, Text} from 'native-base';
import {Grid, Col} from 'react-native-easy-grid';

const getItems = (page, maxPage) => {
  let pages = [];
  if (page <= 3) {
    for (let i = 1; i <= Math.min(4, maxPage); i++) {
      pages.push(i);
    }
  } else if (maxPage - page <= 2) {
    for (let i = maxPage - 3; i <= maxPage; i++) {
      pages.push(i);
    }
  } else {
    for (let i = page - 2; i <= page + 2; i++) {
      pages.push(i);
    }
  }
  pages.unshift('<<');
  pages.push('>>');
  return pages;
};

const getButtons = (page, totalPages, changePage) => {
  return getItems(page, totalPages).map((item) => (
    <Col>
      <Button
        primary={item == page}
        transparent={item != page}
        onPress={() => {
          if (item === '<<') {
            changePage(1);
          } else if (item === '>>') {
            changePage(totalPages);
          } else {
            changePage(parseInt(item));
          }
        }}>
        <Text> {item} </Text>
      </Button>
    </Col>
  ));
};

const Pagination = ({page, totalPages, changePage}) => {
  console.log(page, totalPages);
  if (totalPages <= 1) {
    return <React.Fragment></React.Fragment>;
  }
  return <Grid>{getButtons(page, totalPages, changePage)}</Grid>;
};

export default Pagination;
