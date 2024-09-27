import CustomButton from '@components/CustomButton';
import ItemInfo from './ItemInfo';

export default function HeaderInfo({ dataHeaderInfo }) {
  return (
    <div
      style={{
        backgroundColor: '#EEF7FF',
        borderColor: '#BDD7EF',
        padding: '24px 24px 24px 66px',
      }}
      className="grid  border-t grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      {dataHeaderInfo.map((col, index) => {
        return (
          <div className="flex flex-col gap-10" key={index}>
            {col.map((itemInfo) => {
              return (
                <ItemInfo
                  label={itemInfo.label}
                  value={itemInfo.value}
                  key={itemInfo.value}
                  align={index === 3 ? 'text-right' : ''}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
