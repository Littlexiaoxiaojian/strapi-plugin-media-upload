import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <div style={{ 
        margin: '2rem auto',
        maxWidth: '800px',
        padding: '0 1rem'
      }}>
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Welcome to Media Upload Plugin~
          </h2>
          <p style={{ 
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            <strong>Description:</strong> This is a media upload plugin for Strapi that provides enhanced file management capabilities.
          </p>
          <p style={{ 
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            <strong>Version:</strong> 1.0.11
          </p>
          <p style={{ 
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            <strong>Author:</strong> Eli
          </p>
          <p style={{ 
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            <strong>License:</strong> MIT
          </p>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Repository: </strong> 
            <a 
              href="https://github.com/Littlexiaoxiaojian/strapi-plugin-media-upload" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Main>
  );
};

export { HomePage };
