<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit506a3025ec6c2e0a92472eb65b8dd024
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit506a3025ec6c2e0a92472eb65b8dd024::$classMap;

        }, null, ClassLoader::class);
    }
}
