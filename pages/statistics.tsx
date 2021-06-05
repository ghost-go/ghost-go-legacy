import {useEffect} from 'react';
import {Pagination, ProblemCard2} from 'components/common';
import {
  Container,
  Statistic,
  Header,
  Grid,
  Card,
  Tab,
  PaginationProps,
  TabProps,
  Message,
} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import {useQueryParam} from 'use-query-params';
import {
  useDispatch,
  useTypedSelector,
  checkTokenIsValid,
  useGenericData,
  useAuth,
} from 'utils';

import {fetchStatistics, fetchWrongs, fetchTried, signOut} from 'slices';

const Statistics = () => {
  const {token} = useAuth();
  const [statistics] = useGenericData(useTypedSelector(i => i.statistics));
  const wrongs = useTypedSelector(i => i.wrongs);
  const router = useRouter();
  const tried = useTypedSelector(i => i.tried);
  const dispatch = useDispatch();
  const [page = '1', setPage] = useQueryParam('page');
  const [active = '0', setActive] = useQueryParam('active');

  const handlePaginationChange = (
    e: React.MouseEvent,
    data: PaginationProps
  ) => {
    setPage(data.activePage);
  };

  useEffect(() => {
    if (active === '1') {
      dispatch(fetchTried({params: {page}}));
    } else if (active === '2') {
      dispatch(fetchWrongs({params: {page}}));
    } else {
      dispatch(fetchWrongs({params: {page, item: 6}}));
      dispatch(fetchTried({params: {page, item: 6}}));
      dispatch(fetchStatistics());
    }
  }, [dispatch, token, active, page]);

  const handleTabChange = (e: React.MouseEvent, data: TabProps) => {
    setPage(1);
    setActive(data.activeIndex);
  };

  const panes = [
    {
      menuItem: {key: 'statistics', content: 'Statistics'},
      render: () => (
        <Tab.Pane>
          <Grid columns={2} divided doubling>
            {statistics && (
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Total Problem Statistics</Header>
                  <Statistic.Group widths={3}>
                    <Statistic color="grey" horizontal>
                      <Statistic.Value>{statistics.all.tried}</Statistic.Value>
                      <Statistic.Label>Tried</Statistic.Label>
                    </Statistic>
                    <Statistic color="green" horizontal>
                      <Statistic.Value>{statistics.all.right}</Statistic.Value>
                      <Statistic.Label>Rights</Statistic.Label>
                    </Statistic>
                    <Statistic color="red" horizontal>
                      <Statistic.Value>{statistics.all.wrong}</Statistic.Value>
                      <Statistic.Label>Wrongs</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Last 30 days</Header>
                  <Statistic.Group widths={3}>
                    <Statistic color="grey" horizontal>
                      <Statistic.Value>
                        {statistics.days_30.tried}
                      </Statistic.Value>
                      <Statistic.Label>Tried</Statistic.Label>
                    </Statistic>
                    <Statistic color="green" horizontal>
                      <Statistic.Value>
                        {statistics.days_30.right}
                      </Statistic.Value>
                      <Statistic.Label>Rights</Statistic.Label>
                    </Statistic>
                    <Statistic color="red" horizontal>
                      <Statistic.Value>
                        {statistics.days_30.wrong}
                      </Statistic.Value>
                      <Statistic.Label>Wrongs</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
            )}
            {tried.status === 'succeeded' && wrongs.status === 'succeeded' && (
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Tried</Header>
                  <Card.Group itemsPerRow={2} stackable doubling>
                    {tried.payload.length === 0 && (
                      <div className="p-4">No data</div>
                    )}
                    {tried.payload.slice(0, 6).map((t: any) => {
                      return (
                        <ProblemCard2
                          onClick={() => {
                            router.push(`/problems/${t.problem.data.id}`);
                          }}
                          problem={t.problem.data}
                          extra={`Tried count ${t.tried_count}`}
                        />
                      );
                    })}
                  </Card.Group>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Most Wrong</Header>
                  <Card.Group itemsPerRow={2} stackable doubling>
                    {wrongs.payload.length === 0 && (
                      <div className="p-4">No data</div>
                    )}
                    {wrongs.payload.slice(0, 6).map((t: any) => {
                      return (
                        <ProblemCard2
                          onClick={() => {
                            router.push(`/problems/${t.problem.data.id}`);
                          }}
                          problem={t.problem.data}
                          extra={`Wrongs count ${t.wrongs_count}`}
                        />
                      );
                    })}
                  </Card.Group>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {key: 'tried', content: 'Tried'},
      render: () => (
        <Tab.Pane>
          {tried.status === 'succeeded' && (
            <>
              <Card.Group itemsPerRow={4} stackable doubling>
                {tried.payload.length === 0 && (
                  <div className="p-4">No data</div>
                )}
                {tried.payload.slice(0, 6).map((t: any) => {
                  return (
                    <ProblemCard2
                      onClick={() => {
                        router.push(`/problems/${t.problem.data.id}`);
                      }}
                      problem={t.problem.data}
                      extra={`Tried count ${t.tried_count}`}
                    />
                  );
                })}
              </Card.Group>
              <div className="mt-5">
                <Pagination
                  defaultActivePage={tried.headers['current-page']}
                  totalPages={tried.headers['total-page']}
                  onPageChange={handlePaginationChange}
                />
              </div>
            </>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: {key: 'wrongs', content: 'Wrongs'},
      render: () => (
        <Tab.Pane>
          {wrongs.status === 'succeeded' && (
            <>
              <Card.Group itemsPerRow={4} stackable doubling>
                {wrongs.payload.length === 0 && (
                  <div className="p-4">No data</div>
                )}
                {wrongs.payload.slice(0, 6).map((t: any) => {
                  return (
                    <ProblemCard2
                      onClick={() => {
                        router.push(`/problems/${t.problem.data.id}`);
                      }}
                      problem={t.problem.data}
                      extra={`wrong count ${t.wrongs_count}`}
                    />
                  );
                })}
              </Card.Group>
              <div className="mt-5">
                <Pagination
                  defaultActivePage={wrongs.headers['current-page']}
                  totalPages={wrongs.headers['total-page']}
                  onPageChange={handlePaginationChange}
                />
              </div>
            </>
          )}
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: { key: "Liked", content: "Liked" },
    //   render: () => <Tab.Pane>Liked</Tab.Pane>,
    // },
  ];

  return (
    <Tab panes={panes} onTabChange={handleTabChange} activeIndex={active} />
  );
};

export default Statistics;
