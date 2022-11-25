import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
//导入 LOGO 地址
import {SYSTEM_LOGO} from "@/constant";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');


  // values被RegisterParams修饰 values可以不存在RegisterParams中被❓修饰的值
  // handleSubmit 提交表单
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword} = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;

    }

    try {
      // 注册
      const id = await register(values);
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);


        /** 此方法会跳转到 redirect 参数所在的位置 */
        // 若history接口仍未初始化完毕 直接返回
        if (!history) return;
        //此处实现的功能：由于此前由于未登录原因被拦截 在登录成功后会返回之前的页面（重定向）
        const {query} = history.location;
        //todo query放在此处的作用是什么？？
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        throw new Error(`register error id =${id}`)
      }

      // setUserLoginState(id);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册'
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="User Center"
          subTitle={'最好的用户管理中心'}
          initialValues={{
            autoLogin: true,
          }}


          //todo 了解 onFinish
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}


        >


          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'用户注册'}/>
          </Tabs>


          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
            </>
          )}


          <div
            style={{
              marginBottom: 24,
            }}
          >


          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
