import * as S from '@components/Loading/Loading.style';

interface LoadingPropsType extends S.AnimationPropsType {
  height?: string;
}

const Loading = ({ height = '100%', border, color, size }: LoadingPropsType) => {
  return (
    <S.Wrapper height={height}>
      <S.Animation border={border} color={color} size={size} />
    </S.Wrapper>
  );
};

export default Loading;
