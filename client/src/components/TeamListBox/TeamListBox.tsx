import React, { useEffect } from 'react';
import styled from 'styled-components';
import useTeam from '@/hooks/useTeam';
import { getUserId } from '@/utils/utils';
import useCardList from '@/hooks/useCardList';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 95%;
  margin: 0 20px;
  border-top: 2px solid ${(props) => props.theme.color.black13};
  padding-top: 1.2rem;
  overflow-y: auto;
  display: grid;
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media only screen and (min-width: 501px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1201px) and (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(5, 1fr);
  }
  column-gap: 10px;
`;

const TeamItem = styled.div`
  width: 100%;
  height: 5rem;
  margin: 20px 0;
  border-radius: 5px;
  background: ${(props) => props.theme.color.black15};
  padding: 10px;
`;

const TeamTitle = styled.div``;

const TeamName = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.size.l};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TeamMember = styled.div`
  color: ${(props) => props.theme.color.black11};
  font-size: ${(props) => props.theme.size.s};
  height: 100%;
`;

const TeamListBox: React.FC<{ showJoinedTeamListVisible: boolean }> = ({ showJoinedTeamListVisible }: { showJoinedTeamListVisible: boolean }) => {
  const { teamList, onGetTeamListRequest } = useTeam();
  const { onGetCardListLumpRequest } = useCardList();
  const userId = getUserId();

  useEffect(() => {
    onGetTeamListRequest({ firstLoad: true });
  }, []);

  useEffect(() => {
    console.log(teamList);
  }, [teamList]);

  const handleGetCardListLump = ({ teamId }: { teamId: number }) => {
    onGetCardListLumpRequest({ teamId });
  };

  return (
    <Container>
      {!showJoinedTeamListVisible &&
        teamList?.map((team) => (
          <Link to={`/team/${team.id}`} key={team.id}>
            <TeamItem onClick={() => handleGetCardListLump({ teamId: team.id })}>
              <TeamTitle>
                <TeamName>{team.teamName}</TeamName>
                <TeamMember>멤버 수: {team.joinUsers.length}</TeamMember>
              </TeamTitle>
            </TeamItem>
          </Link>
        ))}
      {showJoinedTeamListVisible &&
        teamList?.map(
          (team) =>
            team.joinUsers.some((user) => user.id === userId) && (
              <Link to={`/team/${team.id}`} key={team.id}>
                <TeamItem onClick={() => handleGetCardListLump({ teamId: team.id })}>
                  <TeamTitle>
                    <TeamName>{team.teamName}</TeamName>
                    <TeamMember>멤버 수: {team.joinUsers.length}</TeamMember>
                  </TeamTitle>
                </TeamItem>
              </Link>
            ),
        )}
    </Container>
  );
};

export default TeamListBox;
