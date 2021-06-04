import {Pagination as Pager, PaginationProps, Icon} from 'semantic-ui-react';
const Pagination = (props: PaginationProps) => (
  <Pager
    boundaryRange={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    prevItem={{content: <Icon name="angle left" />, icon: true}}
    nextItem={{content: <Icon name="angle right" />, icon: true}}
    {...props}
  />
);

export default Pagination;
