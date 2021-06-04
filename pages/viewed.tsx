import {useEffect} from 'react';
import {Tab, PaginationProps, TabProps, Card} from 'semantic-ui-react';
import {Pagination, ProblemCard2, KifuCard2} from 'components/common';
import {timeAgo, useDispatch, useTypedSelector, useAuth} from 'utils';
import {useQueryParam} from 'use-query-params';

import {useRouter} from 'next/router';
import {fetchViewedProblems, fetchViewedKifus} from 'slices';

const Dashboard = () => {
  const {token} = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [page = '1', setPage] = useQueryParam('page');
  const [active = '0', setActive] = useQueryParam('active');

  const viewedProblems = useTypedSelector(i => i.viewedProblems);
  const viewedKifus = useTypedSelector(i => i.viewedKifus);

  const handlePaginationChange = (
    e: React.MouseEvent,
    data: PaginationProps
  ) => {
    setPage(data.activePage);
  };

  const handleTabChange = (e: React.MouseEvent, data: TabProps) => {
    setPage(1);
    setActive(data.activeIndex);
  };

  const panes = [
    {
      menuItem: {
        key: 'problems',
        icon: 'puzzle',
        content: 'Viewed Problems',
      },
      render: () => (
        <Tab.Pane>
          {viewedProblems.status === 'succeeded' && (
            <>
              <Card.Group itemsPerRow={4} stackable doubling>
                {viewedProblems.payload.data.map((vp: any) => {
                  const pdata = vp.relationships.problem.data;
                  const problem = viewedProblems.payload.included.find(
                    (i: any) => i.id === pdata.id && i.type === pdata.type
                  );
                  return (
                    <ProblemCard2
                      onClick={() => {
                        router.push(`/problems/${problem.id}`);
                      }}
                      problem={problem}
                      extra={`Viewed at ${timeAgo(vp.attributes.updated_at)}`}
                    />
                  );
                })}
              </Card.Group>
              <div className="mt-5">
                <Pagination
                  defaultActivePage={page}
                  totalPages={viewedProblems.headers['total-pages']}
                  onPageChange={handlePaginationChange}
                />
              </div>
            </>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'kifus',
        icon: 'book',
        content: 'Viewed Kifus',
      },
      render: () => (
        <Tab.Pane>
          {viewedKifus.status === 'succeeded' && (
            <>
              <Card.Group itemsPerRow={4} stackable doubling>
                {viewedKifus.payload.data &&
                  viewedKifus.payload.data.map((vp: any) => {
                    const pdata = vp.relationships.kifu.data;
                    const kifu = viewedKifus.payload.included.find(
                      (i: any) => i.id === pdata.id && i.type === pdata.type
                    );
                    return (
                      <KifuCard2
                        onClick={() => {
                          router.push(`/kifus/${kifu.id}`);
                        }}
                        kifu={kifu}
                        extra={`Viewed at ${timeAgo(vp.attributes.updated_at)}`}
                      />
                    );
                  })}
              </Card.Group>
              <div className="mt-5">
                <Pagination
                  defaultActivePage={viewedKifus.headers['current-page']}
                  totalPages={viewedKifus.headers['total-page']}
                  onPageChange={handlePaginationChange}
                />
              </div>
            </>
          )}
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (active === '0') {
      dispatch(fetchViewedProblems({params: {page}}));
    } else if (active === '1') {
      dispatch(fetchViewedKifus({params: {page}}));
    }
  }, [dispatch, page, active]);

  return (
    <Tab panes={panes} onTabChange={handleTabChange} activeIndex={active} />
  );
};

export default Dashboard;
