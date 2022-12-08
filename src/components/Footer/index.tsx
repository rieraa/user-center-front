import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'ameee 😊';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'user center',
          title: '用户中心',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> Rieraa GitHub</>,
          href: 'https://github.com/rieraa',
          blankTarget: true,
        },
        {
          key: 'record',
          title: <>闽ICP备2022018187号</>,
          href: "https://beian.miit.gov.cn/",
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
