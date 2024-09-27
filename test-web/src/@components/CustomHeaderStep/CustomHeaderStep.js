export default function CustomHeaderStep({ titleRight, ContentRight, navigations }) {
  const navigationStyle = {
    isActive: {
      backgroundColor: '#023E73',
      color: '#4FDFC8',
    },
  };

  return (
    <div className="flex flex-row justify-between">
      <ul>
        {navigations.map((navigation, index) => (
          <li style={navigationStyle} className="px-5 py-5" key={index + navigation.name}>
            {navigation.name}
          </li>
        ))}
      </ul>
      <div>
        <span>{titleRight}</span>
        <p>{ContentRight}</p>
      </div>
    </div>
  );
}
