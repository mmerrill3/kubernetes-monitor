import { Buffer } from 'buffer';

import { V1Secret } from '@kubernetes/client-node';

import { k8sApi } from '../supervisor/cluster';
import * as kubernetesApiWrappers from '../supervisor/kuberenetes-api-wrappers';
import { ImageSecrets } from './types';


export async function getNamespacedDockerconfigSecret(
    namespace: string,
    image: string,
    secretNames: string[] | undefined): Promise<ImageSecrets> {

    if (secretNames === undefined) {
        return {
            imagePullSecrets: [],
        }
    }

    var decodedSecrets: string[] = [];

    for (var secretName in secretNames) {
        const secretResult =
            await kubernetesApiWrappers.retryKubernetesApiRequest(() =>
                k8sApi.coreClient.readNamespacedSecret(secretName, namespace),
            );
        const decodedSecret = transformDockerSecret(image, secretResult.body);
        if (decodedSecret !== "") {
            decodedSecrets.push(decodedSecret);
        }
    }

    return {
        imagePullSecrets: decodedSecrets,
    };
}

function transformDockerSecret(image: string, secret: V1Secret): string {

    if (secret.type === "kubernetes.io/dockerconfigjson") {
        if (secret.data !== undefined) {
            const secretDataValue = secret.data[".dockerconfigjson"];
            const buff = Buffer.from(secretDataValue, 'base64');
            const jsonAuths = JSON.parse(buff.toString('utf-8'));
            for (var repo in jsonAuths["auths"]) {
                if (image.includes(repo)) {
                    return repo["username"].concat(":", repo["password"]);
                }
            }
        }
    }

    return ""
}