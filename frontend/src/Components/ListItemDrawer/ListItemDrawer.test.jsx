import React from 'react';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { ListItemDrawer } from './index';

describe('ListItemDrawer', () => {
  const TestComponent = (props) => {
    return <ListItemDrawer {...props} />;
  };

  it('should render', () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText('This is the drawer'));
  });
});
