import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '什么是.NET nanoFramework',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        .NET nanoFramework是一个免费且开源的平台，可以用于编写针对受限嵌入式设备的托管代码应用程序。
        它适用于多种类型的项目，包括物联网传感器、可穿戴设备、学术概念验证、机器人技术、爱好者/创客创作甚至复杂的工业设备。
        它通过为嵌入式开发人员提供桌面应用程序开发人员使用的现代技术和工具，使这些平台的开发更加简单、快速和成本更低。
      </>
    ),
  },
  {
    title: '为什么使用.NET nanoFramework',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        .NET nanoFramework是在嵌入式设备上开发软件的完美工具。
        您可以从一个低成本且易于获取的开发板开始，然后使用.NET nanoFramework编写、调试和部署代码。
      </>
    ),
  },
  {
    title: '社区帮助',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        请注意，我们所有的工作都是在开源精神下进行的。

        所有讨论都是公开的，这样每个人都可以参与并互相帮助。如果您需要帮助，请使用以下列出的方法。

        这样可以确保核心团队了解项目进展情况，并使每个人都能从彼此的答案和知识中受益。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
